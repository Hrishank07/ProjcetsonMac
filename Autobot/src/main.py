"""
Module: main.py
Purpose: Entry point for the Job Application Bot that ties together:
         - Job application automation,
         - ATS evaluation for a resume against a job description, and
         - Comparison of two resumes using the ATS interface.
"""

import logging
from src.resume_parser import ResumeParser
from src.job_automation import JobAutomation
from src.ats_interface import main as ats_interface_main

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def run_job_application():
    """
    Runs the job application automation process.
    """
    pdf_resume_path = "../data/sample_resume.pdf"
    # Define the job application URLs (adjust as needed)
    job_urls = [
        "https://example.com/job-application-1",
        # Add more job URLs if desired
    ]
    
    try:
        # Parse the resume using ResumeParser
        resume_parser = ResumeParser(pdf_resume_path)
        resume_parser.extract_text()
        resume_data = resume_parser.parse_text()
        logger.info(f"Parsed Resume Data: {resume_data}")
    except Exception as e:
        logger.error(f"Failed to parse resume: {e}")
        return

    # Setup and execute job automation
    automation = JobAutomation()
    try:
        automation.setup_browser()
        for url in job_urls:
            logger.info(f"Applying for job at: {url}")
            automation.apply_for_job(url, resume_data, pdf_resume_path)
    except Exception as e:
        logger.error(f"Error during job automation: {e}")
    finally:
        automation.quit_browser()

def main():
    """
    Main function providing a menu to choose between job application automation 
    and ATS evaluation (including resume comparison).
    """
    print("Welcome to the Job Application Bot")
    print("Please select an option:")
    print("1. Apply for job (automation)")
    print("2. Evaluate a single resume against a job description (ATS Evaluation)")
    print("3. Compare two resumes for ATS Evaluation")
    
    choice = input("Enter your choice (1/2/3): ").strip()
    
    if choice == "1":
        run_job_application()
    elif choice == "2" or choice == "3":
        # The ats_interface_main() function in ats_interface.py provides
        # interactive options for evaluating and comparing resumes.
        ats_interface_main()
    else:
        print("Invalid choice. Exiting.")

if __name__ == "__main__":
    main()
