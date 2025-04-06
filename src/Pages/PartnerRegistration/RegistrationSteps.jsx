import { CheckCircle, AlertCircle, Loader } from "lucide-react";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2Address from "./Step2Address";
import Step3Professional from "./Step3Professional";
import Step4Documents from "./Step4Documents";

const RegistrationSteps = ({
  currentStep,
  formData,
  formErrors,
  previewImages,
  isLoading,
  error,
  isGettingLocation,
  mapRef,
  onNextStep,
  onPrevStep,
  onChange,
  onMultiSelectChange,
  onFileChange,
  onAddMandaliMember,
  onRemoveMandaliMember,
  onMandaliMemberChange,
  onGetCurrentLocation,
  onSubmit,
  showPassword,
  showConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
}) => {
    const genderOptions = ["Male", "Female", "Other"];
  return (
    <>
      {/* Progress Steps */}
      <div className="px-6 py-4 bg-orange-50 border-b border-orange-100">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentStep > step ? <CheckCircle className="h-5 w-5" /> : <span>{step}</span>}
              </div>
              <div className="ml-2 hidden sm:block">
                <p className={`text-sm font-medium ${currentStep >= step ? "text-orange-800" : "text-gray-500"}`}>
                  {step === 1 && "Basic Info"}
                  {step === 2 && "Location"}
                  {step === 3 && (formData.partnerType === "pandit" ? "Professional" : "Mandali")}
                  {step === 4 && "Documents"}
                </p>
              </div>
              {step < 4 && (
                <div
                  className={`w-12 sm:w-24 h-1 mx-2 ${currentStep > step ? "bg-orange-600" : "bg-gray-200"}`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Registration Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit}>
          {currentStep === 1 && (
            <Step1BasicInfo
              formData={formData}
              formErrors={formErrors}
              onChange={onChange}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              setShowPassword={setShowPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              genderOptions={genderOptions}

            />
          )}
          {currentStep === 2 && (
            <Step2Address
              formData={formData}
              formErrors={formErrors}
              onChange={onChange}
              isGettingLocation={isGettingLocation}
              onGetCurrentLocation={onGetCurrentLocation}
              mapRef={mapRef}
            />
          )}
          {currentStep === 3 && (
            <Step3Professional
              formData={formData}
              formErrors={formErrors}
              onChange={onChange}
              onMultiSelectChange={onMultiSelectChange}
              onAddMandaliMember={onAddMandaliMember}
              onRemoveMandaliMember={onRemoveMandaliMember}
              onMandaliMemberChange={onMandaliMemberChange}
            />
          )}
          {currentStep === 4 && (
            <Step4Documents
              formData={formData}
              formErrors={formErrors}
              previewImages={previewImages}
              onChange={onChange}
              onFileChange={onFileChange}
            />
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={onPrevStep}
                className="px-6 py-2 border border-orange-200 text-orange-700 rounded-lg hover:bg-orange-50"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={onNextStep}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Registration"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationSteps;