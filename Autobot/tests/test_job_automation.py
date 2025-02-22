from src.job_automation import JobAutomation

class DummyDriver:
    def quit(self):
        pass

def test_setup_browser(monkeypatch):
    # Replace the webdriver.Chrome call with a dummy function returning a DummyDriver.
    def dummy_chrome(executable_path, options):
        return DummyDriver()
    monkeypatch.setattr("src.job_automation.webdriver.Chrome", dummy_chrome)
    
    automation = JobAutomation()
    automation.setup_browser()
    assert automation.driver is not None
    automation.quit_browser()
