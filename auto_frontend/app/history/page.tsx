"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading"
import { ErrorMessage } from "@/components/ui/error-message"
import { api, HistoryItem } from "@/lib/api"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIteration, setSelectedIteration] = useState<HistoryItem | null>(null)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const data = await api.getHistory()
      setHistory(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load history')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F7F7]">
      <header className="bg-[#10A37F] text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Optimization History</h1>
        <Link href="/interact">
          <Button 
            variant="outline" 
            className="bg-white text-[#10A37F] border-[#10A37F] hover:bg-[#E7F7F3]"
          >
            Back to Optimizer
          </Button>
        </Link>
      </header>

      <main className="flex-grow p-4 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 text-[#353740]">Previous Optimizations</h2>
              {history.map((item) => (
                <Card 
                  key={item.id} 
                  className={`cursor-pointer transition-colors hover:bg-[#E7F7F3] ${
                    selectedIteration?.id === item.id ? 'border-[#10A37F] border-2' : 'border-[#E5E5E5]'
                  }`}
                  onClick={() => setSelectedIteration(item)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-[#353740]">
                      Optimization #{item.id}
                    </CardTitle>
                    <p className="text-sm text-[#6E6E80]">
                      {formatDate(item.created_at)}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#6E6E80] mb-2">
                      <strong>QA Pairs:</strong> {item.num_qa_pairs}
                    </p>
                    <p className="text-sm text-[#6E6E80]">
                      <strong>Iteration:</strong> {item.iteration_number + 1}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 text-[#353740]">Optimization Details</h2>
              {selectedIteration ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#353740]">Optimization Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Initial Prompt:</h3>
                      <div className="prose prose-sm max-w-none bg-gray-50 p-3 rounded">
                        <ReactMarkdown>
                          {selectedIteration.initial_prompt}
                        </ReactMarkdown>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Previous Problem:</h3>
                      <div className="prose prose-sm max-w-none bg-gray-50 p-3 rounded">
                        <ReactMarkdown>
                          {selectedIteration.previous_problem}
                        </ReactMarkdown>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Final Optimized Prompt:</h3>
                      <div className="prose prose-sm max-w-none bg-gray-50 p-3 rounded">
                        <ReactMarkdown>
                          {selectedIteration.final_prompt}
                        </ReactMarkdown>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">QA Pairs:</h3>
                      {selectedIteration.qa_pairs.map((qa, index) => (
                        <div key={index} className="mb-4 p-3 bg-gray-50 rounded">
                          <p><strong>Question:</strong> {qa.question}</p>
                          <p><strong>True Answer:</strong> {qa.true_answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-[#353740]">
                    Select an optimization from the list to view details
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 