import aws from "aws-sdk";

instance.put("/importS3file", {
    handler: async function (req, reply) {
        // download the file via aws s3 here
        const signedUrlExpireSeconds = 60 * 5;
        const {
            body: { fileKey },
        } = req;

        aws.config.update({
            accessKeyId: "Your_s3AccessKeyId",
            secretAccessKey: "Your_s3SecretAccessKey",
        });
        const s3 = new aws.S3();
        s3.getSignedUrl(
            "getObject",
            {
                Bucket: `${BUCKET_NAME}`,
                Key: fileKey,
                Expires: signedUrlExpireSeconds,
            },
            async (err, data) => {
                if (err) {
                    reply.code(500).send({ errorMessage: err.message });
                } else {
                    // send url to frontend
                    reply.code(200).send({ presignedUrl: data });
                }
            }
        );
    },
});
done();
