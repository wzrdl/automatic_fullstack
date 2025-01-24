from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
from run_cmb import run_iteration
from flask_cors import CORS
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

app = Flask(__name__)
# 允许所有域名访问
CORS(app, resources={r"/api/*": {"origins": "*"}})

# PostgreSQL配置
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# 定义数据模型
class QAPair(db.Model):
    __tablename__ = 'qa_pairs'
    
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text)
    true_answer = db.Column(db.Text)
    model_answer = db.Column(db.Text)  # 添加模型回答字段
    iteration_id = db.Column(db.Integer, db.ForeignKey('iterations.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Iteration(db.Model):
    __tablename__ = 'iterations'
    
    id = db.Column(db.Integer, primary_key=True)
    initial_prompt = db.Column(db.Text)  # 初始提示词
    previous_problem = db.Column(db.Text)  # 添加 previous_problem 字段
    final_prompt = db.Column(db.Text)
    num_qa_pairs = db.Column(db.Integer)
    iteration_number = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    qa_pairs = db.relationship('QAPair', backref='iteration')

# 获取所有迭代历史
@app.route('/api/history', methods=['GET'])
def get_history():
    try:
        iterations = Iteration.query.order_by(Iteration.created_at.desc()).all()
        history = []
        for iteration in iterations:
            history.append({
                'id': iteration.id,
                'initial_prompt': iteration.initial_prompt,
                'previous_problem': iteration.previous_problem,
                'final_prompt': iteration.final_prompt,
                'num_qa_pairs': iteration.num_qa_pairs,
                'iteration_number': iteration.iteration_number,
                'created_at': iteration.created_at.isoformat(),
                'qa_pairs': [{
                    'question': qa.question,
                    'true_answer': qa.true_answer,
                    'model_answer': qa.model_answer
                } for qa in iteration.qa_pairs]
            })
        return jsonify({'history': history})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 获取单个迭代的详细信息
@app.route('/api/iteration/<int:iteration_id>', methods=['GET'])
def get_iteration(iteration_id):
    try:
        iteration = Iteration.query.get_or_404(iteration_id)
        result = {
            'id': iteration.id,
            'initial_prompt': iteration.initial_prompt,
            'previous_problem': iteration.previous_problem,
            'final_prompt': iteration.final_prompt,
            'num_qa_pairs': iteration.num_qa_pairs,
            'iteration_number': iteration.iteration_number,
            'created_at': iteration.created_at.isoformat(),
            'qa_pairs': [{
                'question': qa.question,
                'true_answer': qa.true_answer,
                'model_answer': qa.model_answer
            } for qa in iteration.qa_pairs]
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/run', methods=['POST'])
def run_model():
    try:
        data = request.json
        prompt_template = data.get('prompt_template')
        num_qa_pairs = data.get('num_qa_pairs')
        qa_pairs = data.get('qa_pairs')
        num_iterations = data.get('num_iterations')

        if not all([prompt_template, num_qa_pairs, qa_pairs, num_iterations]):
            return jsonify({'error': 'Missing required parameters'}), 400

        results = run_iteration(
            prompt_template=prompt_template,
            qa_pairs=qa_pairs,
            num_iterations=num_iterations
        )

        # 保存结果到数据库
        for iteration_result in results:
            iteration = Iteration(
                initial_prompt=prompt_template,
                previous_problem=iteration_result['previous_problem'],
                final_prompt=iteration_result['final_prompt'],
                num_qa_pairs=num_qa_pairs,
                iteration_number=iteration_result['iteration']
            )
            db.session.add(iteration)
            db.session.flush()

            # 保存QA pairs
            for qa in qa_pairs:
                qa_pair = QAPair(
                    question=qa['question'],
                    true_answer=qa['answer'],
                    iteration_id=iteration.id
                )
                db.session.add(qa_pair)

        db.session.commit()

        return jsonify({
            'status': 'success',
            'results': results
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 