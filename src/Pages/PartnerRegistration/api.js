export const registerPartner = async (formData) => {
    const formDataToSend = new FormData();
  
    // Prepare form data based on partner type
    if (formData.partnerType === "pandit") {
        // Pandit registration data
        formDataToSend.append('user_type', 'pandit');
        formDataToSend.append('username', formData.email.split('@')[0]);
        formDataToSend.append('name', formData.fullName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('mobile', formData.mobile);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('state', formData.state);
        formDataToSend.append('country', formData.country);
        formDataToSend.append('pincode', formData.pincode);
        formDataToSend.append('gender', formData.gender.toLowerCase());
        formDataToSend.append('aadhar_no', formData.aadharNumber);
        formDataToSend.append('dob', formData.dateOfBirth);
        formDataToSend.append('skills', formData.specialization.join(", "));
        formDataToSend.append('experience', formData.experience);
        formDataToSend.append('languages', formData.languages.join(", "));
        formDataToSend.append('short_discription', formData.shortDescription);
        formDataToSend.append('long_discription', formData.longDescription);
        
        // Append files
        if (formData.aadharImage) {
          formDataToSend.append('aadhar_image', formData.aadharImage);
        }
        if (formData.profileImage) {
          formDataToSend.append('profile_image', formData.profileImage);
        }
        if (formData.certificates && formData.certificates.length > 0) {
          formData.certificates.forEach((certificate, index) => {
            formDataToSend.append(`certificates[${index}]`, certificate);
          });
        }
      } else {
        // Bhajan Mandali registration data
        formDataToSend.append('user_type', 'bhajan_mandal');
        formDataToSend.append('bhajan_name', formData.mandaliName);
        formDataToSend.append('owner_name', formData.fullName);
        formDataToSend.append('owner_email', formData.email);
        formDataToSend.append('owner_phone', formData.mobile);
        formDataToSend.append('owner_password', formData.password);
        formDataToSend.append('bhajan_member', formData.totalMembers);
        formDataToSend.append('bhajan_category', formData.mandaliCategory);
        formDataToSend.append('exp_year', formData.mandaliExperience);
        formDataToSend.append('aadhar_number', formData.aadharNumber);
        formDataToSend.append('short_discription', formData.shortDescription);
        formDataToSend.append('long_discription', formData.longDescription);
        
        // Address
        formDataToSend.append('mandali_address[address]', formData.address);
        formDataToSend.append('mandali_address[city]', formData.city);
        formDataToSend.append('mandali_address[state]', formData.state);
        formDataToSend.append('mandali_address[country]', formData.country);
        formDataToSend.append('mandali_address[pin_code]', formData.pincode);
        
        // Members
        formData.mandaliMembers.forEach((member, index) => {
          formDataToSend.append(`members[${index}][name]`, member.name);
          formDataToSend.append(`members[${index}][role]`, member.role);
          formDataToSend.append(`members[${index}][experience]`, member.experience);
        });
        // Price if available
        if (formData.mandaliPrice) {
          formDataToSend.append('bhajan_price', formData.mandaliPrice);
        }
        // Append files
        if (formData.aadharImage) {
          formDataToSend.append('aadhar_image', formData.aadharImage);
        }
        if (formData.profileImage) {
          formDataToSend.append('bhajan_image', formData.profileImage);
          formDataToSend.append('profile_image', formData.profileImage);
        }
      }
    const response = await fetch('http://192.168.1.36:3000/api/partner/register', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8'
    },
      body: formDataToSend
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register. Please try again.');
    }
  
    const data = await response.json();
    return data.userId || data.id;
  };