import { v2 as cloudinary } from 'cloudinary';
const dotenv = require('dotenv');

cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret,
})

const uploadofCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath) return null;

        // Configuration
        cloudinary.config({ 
            cloud_name: 'dwfn4yrbe', 
            api_key: '873471998155466', 
            api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
        });
    
        // Upload an image
        const uploadResult = await cloudinary.uploader
        .upload(
            localFilePath, {
                resource_type:'auto'
            }
        )
        console.log("Cloudinary resp",uploadResult.url);
        return uploadResult;   
    }
    catch(error){
        console.log("error in cloudinary",error.message);
        fs.unlinkSync(localFilePath);
        return null;
    }
}
export {uploadofCloudinary}; 