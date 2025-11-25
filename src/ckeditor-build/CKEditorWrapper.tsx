import React, { useEffect, useRef } from 'react';

interface CKEditorWrapperProps {
    editor: any;               // o ClassicEditor do window
    data: string;              // conteúdo inicial
    onChange?: (data: string) => void; // callback quando muda
    config?: any;              // configuração extra do editor
}

const CKEditorWrapper: React.FC<CKEditorWrapperProps> = ({ editor, data, onChange, config }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const instanceRef = useRef<any>(null);

    useEffect(() => {
        if (!editorRef.current) return;
        // Cria o editor
        editor.create(editorRef.current, { ...config, initialData: data }).then((ed: any) => {
            instanceRef.current = ed;

            // Evento de mudança de conteúdo
            if (onChange) {
                ed.model.document.on('change:data', () => {
                    onChange(ed.getData());
                });
            }
        });

        // Cleanup
        return () => {
            if (instanceRef.current) {
                instanceRef.current.destroy().catch(() => {});
                instanceRef.current = null;
            }
        };
    }, [editorRef]);

    return <div ref={editorRef}></div>;
};

export default CKEditorWrapper;
