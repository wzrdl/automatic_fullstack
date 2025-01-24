import random
from _init_ import LLMAPI
import pandas as pd
from gradient import GradientGenerator
from optimizer import PromptGenerator
from str_extract import StringExtractor

llm_api = LLMAPI()
#memory = ConversationBufferMemory()


prompts = {
    "template1": """\
    Think step by step and answer the question.
    """,
    "template2": """\
    As a highly skilled and experienced doctor, you possess a wealth of medical knowledge and clinical expertise. Think step by step and answer the question.
    """,
    "template3": """\
    Think step by step and answer the question.
    """,
    "default_template": """\
    As a highly skilled and experienced doctor, you possess a wealth of medical knowledge and clinical expertise. Think step by step and answer the question.
    """
}
    
model_type = "openai"  # 你想使用哪个模型


# 你要使用哪一个模板，比如 "template1" / "template2" / "template3" / ...
chosen_template_name = "template2"  # 这里可以由你在程序中或在外部输入来决定

"""
# 从 CSV 读取文本（假设 CSV 没有表头，且文本在第一列）
csv_file_path = "D:/LLMdata/CMB/CMB-Clin/其他.csv"  # 你的 CSV 文件路径
df = pd.read_csv(csv_file_path, encoding='utf-8')


# 循环次数
num_iterations = 5
template_str = prompts.get(chosen_template_name, prompts["default_template"])
# 随机选择5个索引
random_indices = random.sample(range(len(df)), 5)

for iteration in range(num_iterations):
    template_str += "{text}"
    # 分别保存本轮产生的 Prompt 与 Answer
    all_prompts_round = []
    all_answers_round = []

    for idx in random_indices:
        text_from_csv = df.iloc[idx, 0]
        true_answer = df.iloc[idx, 1]
        
        # 构造最终 Prompt
        final_prompt = template_str.format(text=text_from_csv)
        
        # 调用 LLMAPI
        answer = llm_api.generate_content(prompt=final_prompt, model_type=model_type)
        
        # 分别存入本轮的列表
        all_prompts_round.append(final_prompt)
        all_answers_round.append(answer.content)
        
        print("-----------")
        print(f"[上一轮 - 索引: {idx}] Prompt:\n{final_prompt}")
        print(f"Answer:\n{answer}")

    # 使用 GDprompt 生成新的 prompt
    gradient_generator = GradientGenerator()
    current_prompt = template_str
    false_sentence = " ".join([f"Generated Answer: {ans} True Answer: {true}" for ans, true in zip(all_answers_round, df.iloc[:, 1])])
    gradient_prompt = gradient_generator.gradient_prompt(current_prompt, false_sentence)
    
    # 使用新的 prompt 调用 LLMAPI
    new_answer = llm_api.generate_content(prompt=gradient_prompt, model_type=model_type)

    print(f"New Answer:\n{new_answer}")

    # 使用 PromptGenerator 优化生成的 prompt
    prompt_generator = PromptGenerator()
    extractor = StringExtractor(new_answer.content)
    previous_problem = extractor.extract_between_tags()
    old_prompt = template_str

    # 根据循环次数进行指数衰减
    initial_step = 200
    decay_rate = 0.9
    step = str(max(1, int(initial_step * (decay_rate ** iteration))))
    optimized_prompt = prompt_generator.optimize_prompt(previous_problem, old_prompt, step)

    # 使用优化后的 prompt 调用 LLMAPI
    final_answer = llm_api.generate_content(prompt=optimized_prompt, model_type=model_type)

    #print(f"Optimized Prompt:\n{optimized_prompt}")
    print(f"Final Answer:\n{final_answer}")

    # 将 Final_answer 替换之前使用过的 template
    extractor = StringExtractor(final_answer.content)
    template_str = extractor.extract_between_tags()
    # 将 previous_problem 和 template_str 存储到 CSV 文件中
    data = {
        "iteration": [iteration],
        "previous_problem": [previous_problem],
        "template_str": [template_str]
    }
    out = pd.DataFrame(data)
    csv_file_path = "output_else_4o.csv"
    out.to_csv(csv_file_path, mode='a', header=not pd.io.common.file_exists(csv_file_path), index=False)
"""


def run_iteration(prompt_template, qa_pairs, num_iterations):
    llm_api = LLMAPI()
    results = []
    template_str = prompt_template

    for iteration in range(num_iterations):
        template_str += "{text}"
        all_prompts_round = []
        all_answers_round = []

        for qa_pair in qa_pairs:
            text_from_csv = qa_pair['question']
            true_answer = qa_pair['answer']
            
            final_prompt = template_str.format(text=text_from_csv)
            answer = llm_api.generate_content(prompt=final_prompt, model_type="openai")
            
            all_prompts_round.append(final_prompt)
            all_answers_round.append(answer.content)

        # 使用 GDprompt 生成新的 prompt
        gradient_generator = GradientGenerator()
        current_prompt = template_str
        false_sentence = " ".join([f"Generated Answer: {ans} True Answer: {true}" 
                                 for ans, true in zip(all_answers_round, [qa['answer'] for qa in qa_pairs])])
        gradient_prompt = gradient_generator.gradient_prompt(current_prompt, false_sentence)
        
        new_answer = llm_api.generate_content(prompt=gradient_prompt, model_type="openai")

        # 使用 PromptGenerator 优化生成的 prompt
        prompt_generator = PromptGenerator()
        extractor = StringExtractor(new_answer.content)
        previous_problem = extractor.extract_between_tags()
        old_prompt = template_str

        initial_step = 200
        decay_rate = 0.9
        step = str(max(1, int(initial_step * (decay_rate ** iteration))))
        optimized_prompt = prompt_generator.optimize_prompt(previous_problem, old_prompt, step)

        final_answer = llm_api.generate_content(prompt=optimized_prompt, model_type="openai")

        extractor = StringExtractor(final_answer.content)
        template_str = extractor.extract_between_tags()
        
        # 将结果添加到返回列表，但只返回需要显示的信息
        results.append({
            'iteration': iteration,
            'previous_problem': previous_problem,
            'final_prompt': template_str,
            'qa_pairs': [
                {
                    'question': qa['question'],
                    'true_answer': qa['answer']
                }
                for qa in qa_pairs
            ]
        })

    return results
