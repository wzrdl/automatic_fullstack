from langchain_core.prompts import PromptTemplate

class GradientGenerator:
    def __init__(self):
        self.template = """Your task is to point out the problems with the current prompt based on the wrong
            examples. The current prompt is: {current}. But this prompt gets the following examples
            wrong. You should analyze the differences between wrong predictions and ground truth
            answers, and carefully consider why this prompt led to incorrect predictions. Below are
            the task examples with Wrong prediction, and Ground truth answer. Here are some examples: {false_sentence}.
            Give reasons why the prompt could have gotten these examples wrong. Do not analyze each example in detail, just
            give common mistakes these examples have made.
            Wrap the mistakes with <START> and <END>.     
            """

    def gradient_prompt(self, current, false_sentence):
        # Create a PromptTemplate instance from the template
        cat_prompt = PromptTemplate.from_template(self.template)
        # Format the prompt with the provided arguments using invoke
        prompt_template = cat_prompt.invoke({
            "current": current,
            "false_sentence": false_sentence
        })
        return prompt_template
