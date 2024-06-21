"use client";
import Image from "next/image";
import React from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { IconCopy, IconDownload, IconTrash } from "@tabler/icons-react";
import Link from "next/link";



export default function Home() {
  const [code, setCode] = React.useState('');
  const [replacements, setReplacements] = React.useState(`{
  "DB_NAME": "your_db_name",
  "DB_USER": "your_db_user",
  "DB_PASSWORD": "your_db_password",
  "DB_HOST_REPLICA": "your_db_host_replica",
  "DB_HOST": "your_db_host",
  "DB_LOGGING": "true",
  "REDIS_HOST": "127.0.0.1",
  "SENTRY_ENABLED": "false",
  "ENABLE_SENTRY": "false"
}`);
  const [submittedCode, setSubmittedCode] = React.useState('');
  const [env, setEnv] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setEnv(''); 
    if (code === '') {
      setCode('');
      alert('Please enter a valid JSON code.')
      return;
    }

    if (!isValidJSON(code)) {
      alert('Please enter a valid JSON code.')
      return;
    }

    setSubmittedCode(code);

    const json = JSON.parse(code);
    const envString = jsonToEnv(json);
    
    setEnv(envString);
  }


  function jsonToEnv(json) {
    let envString = '';
    let replacementJson = {};

    if(!isValidJSON(replacements)){
      alert('Please enter a valid Replacement JSON code.')
    } 
    
    replacementJson = JSON.parse(replacements);
    

    for (let key in json) {
      if (json.hasOwnProperty(key)) {
        // match key with replacements
        if (replacementJson[key]) {
          envString += `${key}=${replacementJson[key]}\n`;
        } else {
          envString += `${key}=${json[key]}\n`;
        }
      }
    }
    return envString;
  }

  const isValidJSON = str => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  // convert json to env
  // display env

  return (
    // Row>Col*2
    <div className="p-4">
      <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-200" role="alert">
        <span class="font-medium">Info! </span> 
        This is safety tool to convert JSON to ENV format. We`re not storing any data.
      </div>


      <div className="text-center ">


        <div className="grid grid-cols-3 gap-4 ">
          <div className="text-gray-900 bg-white rounded-xl w-100" >
            <div className="px-4 py-4 text-left border-b">
              Source ( JSON Format)
            </div>
            <CodeEditor
              value={code}
              language="json"
              placeholder="Please enter JSON code."
              onChange={(evn) => setCode(evn.target.value)}
              padding={15}
              style={{
                fontSize: 12,
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
              }}
            />
          </div>
          <div className="text-gray-900 bg-white rounded-xl w-100">
            <div className="px-4 py-4 text-left border-b">
              Repacements ( JSON Format)
            </div>
            <CodeEditor
              language="json"
              placeholder="Please enter JSON code."
              onChange={(evn) => setReplacements(evn.target.value)}
              padding={15}
              value={replacements}
              style={{
                fontSize: 12,

                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
              }}
            />
          </div>
          <div className="text-gray-900 bg-white w-100 rounded-xl">
            <div className="flex justify-between px-4 py-4 border-b">
              <div>
                Result ( ENV Format)
              </div>
              <div>

                {/* copy */}
                {env && (
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-gray-100 bg-gray-500 rounded-full hover:bg-gray-900 hover:text-white" onClick={() => setEnv('')}>
                      <IconTrash size={12}/>
                    </button>
                    <button className="px-4 py-2 text-gray-100 bg-gray-500 rounded-full hover:bg-gray-900 hover:text-white" onClick={() => navigator.clipboard.writeText(env)}>
                    <IconCopy size={12}/>
                    </button>
                    {/* download to file */}
                    <a
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent(env)}`}
                      download="env.txt"
                      className="px-4 py-2 text-gray-100 bg-gray-500 rounded-full hover:bg-gray-900 hover:text-white"
                    >
                      <IconDownload size={12}/>
                    </a>
                  </div>
                )}
              </div>
            </div>

            <CodeEditor
              language="env"
              placeholder="Result will appear here."
              padding={15}
              value={env}
              style={{
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
            />
          </div>
        </div>
      </div>
      <div className="p-4 text-center ">
        <button className="px-8 py-2 text-gray-900 bg-white rounded-full hover:bg-gray-500 hover:text-white" onClick={handleSubmit}>
          Convert
        </button>
      </div>
      <h2 className="mt-4 mb-2 text-2xl font-semibold">
        Thanks for using <span className="text-blue-500">Env Formatter</span>! 🚀
      </h2>

    </div>


  );
}
