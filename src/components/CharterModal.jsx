import React from 'react';
import { X, FileText } from 'lucide-react';
import { orgData } from '../data/ngoData';

export default function CharterModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  const charter = orgData.expandedCharter;
  
  if (!charter) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a1a1a]/50 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white border border-[#e0dbd2] rounded-lg p-6 sm:p-8 shadow-xl max-h-[90vh] flex flex-col">
        
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-md bg-[#f5f0e8] text-[#8a8078] hover:text-[#1a1a1a] transition-colors z-10">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6 pb-6 border-b border-[#e0dbd2] shrink-0">
          <div className="p-3 bg-[#faf7f1] rounded-lg shrink-0">
            <FileText className="w-6 h-6 text-[#8b6914]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              Expanded Mission, Vision & Objectives
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 pr-2 space-y-6" data-lenis-prevent>
          
          {charter.preamble && (
            <div className="mb-8">
              <p className="text-[15px] font-medium text-[#1a1a1a] whitespace-pre-line leading-relaxed">
                {charter.preamble}
              </p>
            </div>
          )}

          {charter.points.map((point) => (
            <div key={point.id} className="flex gap-4">
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#f5f0e8] text-[#3d6b4f] font-semibold text-sm">
                {point.id}
              </div>
              <p className="text-[15px] text-[#5a5347] leading-relaxed pt-1">
                {point.text}
              </p>
            </div>
          ))}
          
          <div className="pt-6 mt-6 border-t border-[#e0dbd2]">
            <p className="text-sm font-medium text-[#1a1a1a] whitespace-pre-line leading-loose text-center italic tracking-wide">
              {charter.closing}
            </p>
          </div>
        </div>
        
        {/* Footer Button */}
        <div className="mt-6 pt-4 shrink-0 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 rounded-md text-sm font-medium text-[#1a1a1a] bg-[#f5f0e8] hover:bg-[#ebe6dc] transition-colors">
            Close Charter
          </button>
        </div>

      </div>
    </div>
  );
}
