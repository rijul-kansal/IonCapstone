const  generateRejectionEmail = (imageLink, candidateName, jobRole) =>{
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rejection Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                width: 80%;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .content {
                margin-bottom: 20px;
            }
            .footer {
                text-align: center;
                font-size: 0.9em;
                color: #777;
            }
            .candidate-image {
                text-align: center;
                margin-bottom: 20px;
            }
            .candidate-image img {
                max-width: 150px;
                border-radius: 50%;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>ION Group</h1>
            </div>
            <div class="candidate-image">
                <img src="${imageLink}" alt="Candidate Image">
            </div>
            <div class="content">
                <p>Dear ${candidateName},</p>
                <p>Thank you for your interest in the ${jobRole} position at ION Group and for taking the time to meet with our team. We appreciate your enthusiasm and the effort you put into your application.</p>
                <p>After careful consideration, we regret to inform you that we have decided to move forward with another candidate who more closely matches the requirements of the position.</p>
                <p>We were impressed with your qualifications and experience, and we encourage you to apply for future openings that match your skills and interests. We will keep your resume on file and reach out if a suitable opportunity arises.</p>
                <p>Thank you once again for your interest in ION Group. We wish you all the best in your job search and future endeavors.</p>
                <p>Sincerely,</p>
                <p>[Your Name]<br>
                [Your Job Title]<br>
                ION Group</p>
            </div>
            <div class="footer">
                <p>ION Group, [Company Address]</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

module.exports = {
    generateRejectionEmail
}