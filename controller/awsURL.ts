import aws from 'aws-sdk';


 async function getImgURL(key: string){
    try {
      aws.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_ACCESS_SECRET,
        region: "us-east-1",
      });

      const s3 = new aws.S3();

      const url = s3.getSignedUrl('getObject', {
        Bucket: "elias-restaurant-app-bucket",
        Key: key,
        Expires: 60*1
      })

      return url;

    } catch (error) {
      console.log(error);
    }
  };

  export default getImgURL;