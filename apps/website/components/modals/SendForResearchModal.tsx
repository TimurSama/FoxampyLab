"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, File, Send } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface SendForResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
}

export default function SendForResearchModal({ 
  isOpen, 
  onClose, 
  serviceTitle 
}: SendForResearchModalProps) {
  const { t } = useI18n();
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log({ description, name, email, phone, files, serviceTitle });
    // Reset form and close modal
    setDescription('');
    setName('');
    setEmail('');
    setPhone('');
    setFiles([]);
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-ink-deep/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-ink-chrome/95 border border-stone-anthracite/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-anthracite/30">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-mono text-xl text-engrave-fresco tracking-wider">
                  {t('modals.sendResearch.title')}
                </h2>
                <button
                  onClick={onClose}
                  className="text-stone-slate hover:text-engrave-line transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              {serviceTitle && (
                <p className="font-mono text-sm text-stone-slate">
                  {t('modals.sendResearch.service')}: {serviceTitle}
                </p>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Description */}
              <div>
                <label className="block font-mono text-sm text-engrave-fresco mb-2">
                  {t('modals.sendResearch.descriptionLabel')}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('modals.sendResearch.descriptionPlaceholder')}
                  className="w-full h-32 px-4 py-3 bg-ink-deep/50 border border-stone-anthracite/30 
                           text-engrave-line font-mono text-sm
                           focus:outline-none focus:border-engrave-line/50 transition-colors
                           resize-none"
                  required
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block font-mono text-sm text-engrave-fresco mb-2">
                  {t('modals.sendResearch.filesLabel')}
                </label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors
                    ${isDragging 
                      ? 'border-engrave-line bg-engrave-line/10' 
                      : 'border-stone-anthracite/30 hover:border-stone-anthracite/50'
                    }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={32} className="mx-auto mb-2 text-stone-slate" />
                  <p className="font-mono text-sm text-stone-slate mb-1">
                    {t('modals.sendResearch.dropFiles')}
                  </p>
                  <p className="font-mono text-xs text-stone-graphite">
                    {t('modals.sendResearch.orClick')}
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files)}
                  />
                </div>

                {/* Files List */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-ink-deep/50 
                                 border border-stone-anthracite/30"
                      >
                        <div className="flex items-center gap-3">
                          <File size={16} className="text-stone-slate" />
                          <div>
                            <p className="font-mono text-xs text-engrave-line">{file.name}</p>
                            <p className="font-mono text-[10px] text-stone-graphite">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-stone-slate hover:text-engrave-line transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Info (Optional) */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-stone-slate mb-2">
                    {t('modals.sendResearch.nameLabel')} ({t('modals.sendResearch.optional')})
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-ink-deep/50 border border-stone-anthracite/30 
                             text-engrave-line font-mono text-sm
                             focus:outline-none focus:border-engrave-line/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-stone-slate mb-2">
                    {t('modals.sendResearch.emailLabel')} ({t('modals.sendResearch.optional')})
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-ink-deep/50 border border-stone-anthracite/30 
                             text-engrave-line font-mono text-sm
                             focus:outline-none focus:border-engrave-line/50 transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-mono text-xs text-stone-slate mb-2">
                    {t('modals.sendResearch.phoneLabel')} ({t('modals.sendResearch.optional')})
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 bg-ink-deep/50 border border-stone-anthracite/30 
                             text-engrave-line font-mono text-sm
                             focus:outline-none focus:border-engrave-line/50 transition-colors"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-stone-anthracite/30">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 border border-stone-anthracite/30 
                           text-stone-slate font-mono text-sm tracking-widest
                           hover:border-engrave-line/50 hover:text-engrave-line transition-colors"
                >
                  {t('common.cancel')}
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 bg-engrave-fresco text-ink-deep 
                           font-mono text-sm tracking-widest flex items-center justify-center gap-2
                           hover:bg-engrave-line transition-colors"
                >
                  <Send size={16} />
                  {t('modals.sendResearch.send')}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

