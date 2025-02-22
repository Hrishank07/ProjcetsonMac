from src.ats_evaluator import ATSEvaluator

def test_ats_evaluator():
    # Sample texts for resume and job criteria.
    sample_resume = "John Doe, experienced Python developer with Django and REST API skills."
    sample_criteria = "Basic qualifications: Python, Django, REST API, and strong problem solving."
    
    evaluator = ATSEvaluator(sample_resume, sample_criteria)
    result = evaluator.evaluate()
    
    # Ensure we get a valid ATS score and keyword lists.
    assert "ats_score" in result
    assert "keywords_matched" in result
    assert "keywords_missing" in result
    # Check that ATS score is computed (score > 0 if keywords match)
    assert result["ats_score"] > 0
