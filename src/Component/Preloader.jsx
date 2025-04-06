import { useEffect, useState, useRef } from 'react';
import './Preloader.css';

const Preloader = ({ onFinish, loadingTasks = [] }) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [progress, setProgress] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const animationRef = useRef(null);
  const fullText = "Loading Resources";
  const totalTasks = loadingTasks.length;

  // Simulate or track actual loading progress
  useEffect(() => {
    if (totalTasks === 0) {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      // In a real app, you would update progress based on actual loading
      // This simulates progress for demo purposes
      setProgress(prev => {
        const newProgress = prev + (100 / (totalTasks * 10));
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [totalTasks]);

  // Track completed tasks (in a real app, you'd call this when tasks complete)
  useEffect(() => {
    if (progress >= 100) {
      setCompletedTasks(totalTasks);
    }
  }, [progress, totalTasks]);

  // Typing effect
  useEffect(() => {
    if (text.length < fullText.length) {
      animationRef.current = setTimeout(() => {
        setText(fullText.substring(0, text.length + 1));
      }, 100);
    } else {
      // Blinking cursor effect
      animationRef.current = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
        clearInterval(animationRef.current);
      }
    };
  }, [text, fullText]);

  // Finish when all tasks are done
  useEffect(() => {
    if (completedTasks === totalTasks && totalTasks > 0) {
      const timer = setTimeout(() => {
        onFinish();
      }, 800); // Short delay for smooth transition

      return () => clearTimeout(timer);
    }
  }, [completedTasks, totalTasks, onFinish]);

  return (
    <div className={`preloader ${completedTasks === totalTasks ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        <h1 className="typing-text">
          {text}
          <span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span>
        </h1>
        
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="loading-details">
          <p>
            Loading: {completedTasks}/{totalTasks} tasks
          </p>
          <p className="percentage">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;