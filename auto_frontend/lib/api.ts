import { config } from './config'

const API_BASE_URL = config.apiBaseUrl;

export interface QAPair {
  question: string;
  answer: string;
}

export interface ModelRunRequest {
  prompt_template: string;
  num_qa_pairs: number;
  qa_pairs: QAPair[];
  num_iterations: number;
}

export interface QAResult {
  question: string;
  true_answer: string;
  model_answer: string;
}

export interface IterationResult {
  iteration: number;
  previous_problem: string;
  final_prompt: string;
  qa_pairs: {
    question: string;
    true_answer: string;
  }[];
}

export interface ModelRunResponse {
  status: string;
  results: IterationResult[];
}

export interface HistoryItem {
  id: number;
  initial_prompt: string;
  previous_problem: string;
  final_prompt: string;
  num_qa_pairs: number;
  iteration_number: number;
  created_at: string;
  qa_pairs: {
    question: string;
    true_answer: string;
  }[];
}

export const api = {
  async runModel(data: ModelRunRequest): Promise<ModelRunResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error running model:', error);
      throw error;
    }
  },

  async getHistory(): Promise<HistoryItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/history`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.history;
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  },

  async getIteration(iterationId: number): Promise<HistoryItem> {
    try {
      const response = await fetch(`${API_BASE_URL}/iteration/${iterationId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching iteration:', error);
      throw error;
    }
  },
}; 