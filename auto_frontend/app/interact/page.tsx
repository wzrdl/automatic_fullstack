"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label" 
import { LoadingSpinner } from "@/components/ui/loading"
import { ErrorMessage } from "@/components/ui/error-message"
import { api, QAPair, IterationResult } from "@/lib/api"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'

export default function InteractionPage() {
  const [prompt, setPrompt] = useState("")
  const [qaPairCount, setQaPairCount] = useState("")
  const [qaPairs, setQaPairs] = useState<QAPair[]>([])
  const [iterations, setIterations] = useState("")
  const [results, setResults] = useState<IterationResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const count = Number.parseInt(qaPairCount)
    if (!isNaN(count) && count > 0) {
      setQaPairs(Array(count).fill({ question: "", answer: "" }))
    } else {
      setQaPairs([])
    }
  }, [qaPairCount])

  const handleQAPairChange = (index: number, field: "question" | "answer", value: string) => {
    const newQAPairs = [...qaPairs]
    newQAPairs[index] = { ...newQAPairs[index], [field]: value }
    setQaPairs(newQAPairs)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await api.runModel({
        prompt_template: prompt,
        num_qa_pairs: qaPairs.length,
        qa_pairs: qaPairs,
        num_iterations: Number(iterations)
      })
      setResults(response.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setPrompt("")
    setQaPairCount("")
    setQaPairs([])
    setIterations("")
    setResults([])
    setError(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F7F7]">
      <header className="bg-[#10A37F] text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Prompt Optimizer</h1>
        <Link href="/history">
          <Button 
            variant="outline" 
            className="bg-white text-[#10A37F] border-[#10A37F] hover:bg-[#E7F7F3]"
          >
            View History
          </Button>
        </Link>
      </header>

      <main className="flex-grow p-4 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}

          {results.map((result, index) => (
            <Card key={index} className="mb-4 border-[#E5E5E5] shadow-sm">
              <CardHeader className="bg-[#E7F7F3]">
                <CardTitle className="text-[#10A37F]">Iteration {result.iteration + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-[#353740]">Previous Problem:</h3>
                  <div className="prose prose-sm max-w-none bg-gray-50 p-3 rounded">
                    <ReactMarkdown>
                      {result.previous_problem}
                    </ReactMarkdown>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-[#353740]">Final Prompt:</h3>
                  <div className="prose prose-sm max-w-none bg-gray-50 p-3 rounded">
                    <ReactMarkdown>
                      {result.final_prompt}
                    </ReactMarkdown>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-[#353740]">QA Pairs:</h3>
                  {result.qa_pairs.map((qa, qaIndex) => (
                    <div key={qaIndex} className="mb-4 p-3 bg-gray-50 rounded">
                      <p className="text-[#353740]"><strong>Question:</strong> {qa.question}</p>
                      <p className="text-[#353740]"><strong>True Answer:</strong> {qa.true_answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-white p-4 border-t border-[#E5E5E5] shadow-inner">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
          <div>
            <Label htmlFor="prompt" className="text-[#353740]">Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt"
              className="min-h-[100px] border-[#E5E5E5] focus:border-[#10A37F] focus:ring-[#10A37F]"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="qaPairCount" className="text-[#353740]">Number of QA Pairs</Label>
            <Input
              id="qaPairCount"
              type="number"
              value={qaPairCount}
              onChange={(e) => setQaPairCount(e.target.value)}
              placeholder="Enter number of QA pairs"
              className="border-[#E5E5E5] focus:border-[#10A37F] focus:ring-[#10A37F]"
              min={1}
              max={10}
              required
              disabled={isLoading}
            />
          </div>

          {qaPairs.map((pair, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`question-${index}`} className="text-[#353740]">Question {index + 1}</Label>
              <Input
                id={`question-${index}`}
                value={pair.question}
                onChange={(e) => handleQAPairChange(index, "question", e.target.value)}
                placeholder={`Enter question ${index + 1}`}
                className="border-[#E5E5E5] focus:border-[#10A37F] focus:ring-[#10A37F]"
                required
                disabled={isLoading}
              />
              <Label htmlFor={`answer-${index}`} className="text-[#353740]">Answer {index + 1}</Label>
              <Input
                id={`answer-${index}`}
                value={pair.answer}
                onChange={(e) => handleQAPairChange(index, "answer", e.target.value)}
                placeholder={`Enter answer ${index + 1}`}
                className="border-[#E5E5E5] focus:border-[#10A37F] focus:ring-[#10A37F]"
                required
                disabled={isLoading}
              />
            </div>
          ))}

          <div>
            <Label htmlFor="iterations" className="text-[#353740]">Number of Iterations</Label>
            <Input
              id="iterations"
              type="number"
              value={iterations}
              onChange={(e) => setIterations(e.target.value)}
              placeholder="Enter number of iterations"
              className="border-[#E5E5E5] focus:border-[#10A37F] focus:ring-[#10A37F]"
              min={1}
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1 bg-[#10A37F] hover:bg-[#1A7F64] text-white" 
              disabled={isLoading}
            >
              {isLoading ? "Optimizing..." : "Optimize Prompt"}
            </Button>
            {results.length > 0 && (
              <Button 
                type="button" 
                variant="outline"
                onClick={handleReset}
                className="flex-1 border-[#10A37F] text-[#10A37F] hover:bg-[#E7F7F3]"
                disabled={isLoading}
              >
                Start New Optimization
              </Button>
            )}
          </div>
        </form>
      </footer>
    </div>
  )
}

