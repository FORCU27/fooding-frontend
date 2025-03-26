/* eslint-disable react/prop-types */
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  formats?: string[];
  placeholder?: string;
  className?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  formats,
  placeholder,
  className,
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        {
          color: [],
        },
        { background: [] },
      ],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      // ['image'],
      ['link'],
    ],
  };

  return (
    <ReactQuill
      theme='snow'
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default QuillEditor;
