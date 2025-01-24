import os
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

class LLMAPI:
    def __init__(self):
        # 加载环境变量
        load_dotenv()
        
        # 直接使用环境变量中的 API key
        self.openai_model = ChatOpenAI(
            api_key=os.getenv('OPENAI_API_KEY'),
            model="gpt-4o-mini"
        )
        #os.environ["ANTHROPIC_API_KEY"] = os.environ.get("OPENAI_API_KEY")  # Replace with your Hugging Face API key

        # Initialize models
        #self.gemini = ChatVertexAI(model="gemini-1.5-flash")

    def generate_content(self, prompt, model_type):
        if model_type == "openai":
            return self.openai_model.invoke(prompt)
        #elif model_type == "gemini":
        #    return self.gemini.invoke(prompt)
        else:
            return "未识别的模型类型"
