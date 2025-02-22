"""
Module: job_automation.py
Purpose: Automates job application process using Selenium to fill forms and upload files.
"""

import time
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from config.config import CHROME_DRIVER_PATH

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class JobAutomation:
    """
    A class to automate the job application process.
    """
    
    def __init__(self):
        self.driver = None
    
    def setup_browser(self) -> None:
        """
        Sets up the Chrome browser with desired options.
        """
        try:
            options = Options()
            # Uncomment the following line for headless mode if needed:
            # options.add_argument("--headless")
            self.driver = webdriver.Chrome(executable_path=CHROME_DRIVER_PATH, options=options)
            logger.info("Browser setup completed.")
        except Exception as e:
            logger.error(f"Error setting up browser: {e}")
            raise
    
    def navigate_to_url(self, url: str) -> None:
        """
        Navigates the browser to the specified URL.
        """
        try:
            self.driver.get(url)
            time.sleep(2)  # Allow time for the page to load
            logger.info(f"Navigated to URL: {url}")
        except Exception as e:
            logger.error(f"Error navigating to URL: {e}")
            raise
    
    def apply_for_job(self, job_url: str, resume_data: dict, pdf_resume_path: str) -> None:
        """
        Automates filling out a job application form.
        
        Args:
            job_url (str): URL of the job application page.
            resume_data (dict): Dictionary of parsed resume data.
            pdf_resume_path (str): Path to the PDF resume file.
        """
        try:
            self.navigate_to_url(job_url)
            
            # Fill in the name field (example using an element with ID "name_input")
            try:
                name_field = self.driver.find_element(By.ID, "name_input")
                name_field.clear()
                name_field.send_keys(resume_data.get("name", ""))
                logger.info("Filled name field.")
            except Exception as e:
                logger.warning(f"Name field issue: {e}")
            
            # Fill in the email field (example using an element with ID "email_input")
            try:
                email_field = self.driver.find_element(By.ID, "email_input")
                email_field.clear()
                email_field.send_keys(resume_data.get("email", ""))
                logger.info("Filled email field.")
            except Exception as e:
                logger.warning(f"Email field issue: {e}")
            
            # Upload the PDF resume (example using an element with ID "resume_upload")
            try:
                upload_field = self.driver.find_element(By.ID, "resume_upload")
                upload_field.send_keys(pdf_resume_path)
                logger.info("Uploaded resume PDF.")
            except Exception as e:
                logger.warning(f"Resume upload issue: {e}")
            
            # Submit the application form (example using an element with ID "submit_btn")
            try:
                submit_button = self.driver.find_element(By.ID, "submit_btn")
                submit_button.click()
                logger.info("Submitted the application.")
            except Exception as e:
                logger.warning(f"Submit button issue: {e}")
            
            time.sleep(2)  # Allow some time after submission
        except Exception as e:
            logger.error(f"Error during job application: {e}")
            raise
    
    def quit_browser(self) -> None:
        """
        Closes the browser and quits the driver.
        """
        if self.driver:
            self.driver.quit()
            logger.info("Browser closed.")

# For independent testing
if __name__ == "__main__":
    job_url = "https://example.com/job-application"
    dummy_resume_data = {"name": "John Doe", "email": "john.doe@example.com"}
    pdf_path = "../data/sample_resume.pdf"
    
    automation = JobAutomation()
    automation.setup_browser()
    automation.apply_for_job(job_url, dummy_resume_data, pdf_path)
    automation.quit_browser()
