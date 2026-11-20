import * as monaco from 'monaco-editor'
import { useEffect, useRef } from 'react'

import styles from './Editor.module.css'

export default function Editor() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const monacoEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!monacoEl.current) return

    editorRef.current = monaco.editor.create(monacoEl.current, {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'typescript',
    })

    return () => {
      editorRef.current?.dispose()
      editorRef.current = null
    }
  }, [])

  return <div className={styles.Editor} ref={monacoEl}></div>
}
