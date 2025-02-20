import os
from dataclasses import dataclass
from config.secrets import OPENAI_API_KEY, GEMINI_API_KEY, DEEPSEEK_API_KEY

@dataclass
class ModelConfig:
    name: str
    api_url: str
    api_key: str

class ModelType:
    CHATGPT = 'chatgpt'
    GEMINI = 'gemini'
    DEEPSEEK = 'deepseek'

# Dictionary holding configurations for each model.
MODEL_CONFIGS = {
    ModelType.CHATGPT: ModelConfig(
        name="ChatGPT",
        api_url="https://api.openai.com/v1/...",  # Replace with the actual endpoint if needed
        api_key= OPENAI_API_KEY
    ),
    ModelType.GEMINI: ModelConfig(
        name="Gemini",
        api_url="https://aistudio.google.com/app/apikey",  # Example endpoint; update as required
        api_key= GEMINI_API_KEY
    ),
    ModelType.DEEPSEEK: ModelConfig(
        name="Deepseek",
        api_url="https://api.deepseek.ai/...",  # Placeholder endpoint; update as required
        api_key= DEEPSEEK_API_KEY
    ),
}

DEFAULT_MODEL = ModelType.CHATGPT

# General settings (e.g., browser driver paths)
CHROME_DRIVER_PATH = os.getenv('CHROME_DRIVER_PATH', '/path/to/chromedriver')

def get_model_config(model_type: str = None) -> ModelConfig:
    """
    Retrieve the configuration for the chosen model.
    
    If model_type is None, prompt the user to choose a model.
    Returns a ModelConfig object.
    """
    if model_type is None:
        print("Select a model:")
        for i, key in enumerate(MODEL_CONFIGS.keys(), start=1):
            print(f"{i}. {MODEL_CONFIGS[key].name}")
        choice = input("Enter the number corresponding to your choice: ").strip()
        try:
            index = int(choice) - 1
            model_type = list(MODEL_CONFIGS.keys())[index]
        except (ValueError, IndexError):
            print("Invalid selection. Using default model.")
            model_type = DEFAULT_MODEL

    return MODEL_CONFIGS.get(model_type, MODEL_CONFIGS[DEFAULT_MODEL])
