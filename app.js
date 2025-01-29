const pdfjsLib = require("pdfjs-dist");


// Route to fetch and convert the image
const extract = async(resumeLink) => {
    let doc = await pdfjsLib.getDocument(resumeLink).promise;
    let page1 = await doc.getPage(1);
    let content = await page1.getTextContent();
    let strings = content.items.map(function(item) {
        return item.str;
    });
    const data = extractInfo(strings, regex)
    return data
};



// Regex for extracting basic info
const regex = {
  name: /([A-Za-z\s]+),/,
  email: /([\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/,
  phone: /\| (\d{10}) \|/,
  github: /GitHub/,
  linkedin: /LinkedIn/,
  leetcode: /Leetcode/,
  portfolio: /Codolio \| Portfolio/,
  education: /Education\s*([\s\S]+?)Skills/,
  skills: /Skills\s*([\s\S]+?)Work Experience/,
  workExperience: /Work Experience([\s\S]+?)Projects/,
  projects: /Projects([\s\S]+?)Academic Achievements/,
  achievements: /Academic Achievements([\s\S]+?)Certifications/,
  certifications: /Certifications([\s\S]+)/
};

// Extracting information
const extractInfo = (rawData, regex) => {
    const result = {};
  
    // Join the rawData array into a single string to apply regex
    const rawDataString = rawData.join(' '); // Join array into one string with spaces
  
    result.name = rawDataString.match(regex.name)?.[1] || '';
    result.email = rawDataString.match(regex.email)?.[1] || '';
    result.phone = rawDataString.match(regex.phone)?.[1] || '';
    result.github = rawDataString.match(regex.github) ? 'Present' : 'Not Present';
    result.linkedin = rawDataString.match(regex.linkedin) ? 'Present' : 'Not Present';
    result.leetcode = rawDataString.match(regex.leetcode) ? 'Present' : 'Not Present';
    result.portfolio = rawDataString.match(regex.portfolio) ? 'Present' : 'Not Present';
  
    // Extracting education, skills, work experience, projects, achievements, and certifications
    result.education = rawDataString.match(regex.education)?.[1] || '';
    result.skills = rawDataString.match(regex.skills)?.[1] || '';
    result.workExperience = rawDataString.match(regex.workExperience)?.[1] || '';
    result.projects = rawDataString.match(regex.projects)?.[1] || '';
    result.achievements = rawDataString.match(regex.achievements)?.[1] || '';
    result.certifications = rawDataString.match(regex.certifications)?.[1] || '';
  
    return result;
  };

module.exports = {
  extract
}