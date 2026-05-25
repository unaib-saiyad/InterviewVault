'use client';
import React, { useState } from 'react'
import { Plus } from 'lucide-react';
import { AddInterviewModal } from '../dashboard/AddInterviewModal';

function InterviewActions() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    if(isOpen){
        return <AddInterviewModal isOpen={isOpen} onClose={handleClose} />
    }
    return (<div className="flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-bold text-slate-900">Interview History</h2>
            <p className="mt-1 text-sm text-slate-600">
                Track your interview progress and outcomes
            </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700" onClick={() => setIsOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Interview
        </button>
    </div>
    )
}

export default InterviewActions