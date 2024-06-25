// pages/switchenv-installation.js
"use client";
import React from 'react';
import Head from 'next/head';

const SwitchenvInstallation = () => {
    return (
        <div className="min-h-screen p-4 ">
            
            <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-200" role="alert">
                <span class="font-medium">Info! </span> 
                This tools support on all platforms, including Windows ( WSL ), macOS, and Linux with bash shell.
            </div>

            <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
                <h1 className="mb-4 text-3xl font-bold">Switchenv Installation Instructions</h1>
                <p className="mb-4">Follow these steps to install and use the <code className="px-2 py-1 bg-gray-200 rounded">switchenv</code> bash package.</p>

                <h2 className="mb-2 text-2xl font-semibold">Installation Steps</h2>
                <ol className="pl-6 mb-4 list-decimal">
                    <li className="mb-2">Open your terminal.</li>
                    <li className="mb-2">Create a new file named <code className="px-2 py-1 bg-gray-200 rounded">switchenv.sh</code> with the following content:</li>
                </ol>

                <pre className="p-4 mb-4 overflow-auto text-white bg-gray-800 rounded">
                    <code>
                        {`#!/bin/bash

function switchenv() {
    local env=$1

    case "$env" in
        dev)
            if [ -f .env.dev ]; then
                rm -f .env
                cp .env.dev .env
                echo "Switched to development environment."
            else
                echo "Development environment file (.env.dev) not found."
            fi
            ;;
        stg)
            if [ -f .env.staging ]; then
                rm -f .env
                cp .env.staging .env
                echo "Switched to staging environment."
            else
                echo "Staging environment file (.env.stg) not found."
            fi
            ;;
        prod)
            if [ -f .env.prod ]; then
                rm -f .env
                cp .env.prod .env
                echo "Switched to production environment."
            else
                echo "Production environment file (.env.prod) not found."
            fi
            ;;
        *)
            echo "Invalid environment. Please provide 'dev', 'stg', or 'prod'."
            ;;
    esac
}

switchenv "$1"`}
                    </code>
                </pre>

                <ol className="pl-6 mb-4 list-decimal" start="3">
                    <li className="mb-2">Make the script executable by running the following command:</li>
                </ol>
                <pre className="p-4 mb-4 overflow-auto bg-gray-200 rounded">
                    <code>chmod +x switchenv.sh</code>
                </pre>

                <ol className="pl-6 mb-4 list-decimal" start="4">
                    <li className="mb-2">Move the script to a directory that is in your PATH, for example:</li>
                </ol>
                <pre className="p-4 mb-4 overflow-auto bg-gray-200 rounded">
                    <code>mv switchenv.sh /usr/local/bin/switchenv</code>
                </pre>

                <ol className="pl-6 mb-4 list-decimal" start="5">
                    <li className="mb-2">Don`t forget to add your environment files to <code className="px-2 py-1 bg-gray-200 rounded">.gitignore</code> to prevent them from being committed to your repository:</li>
                </ol>
                <pre className="p-4 mb-4 overflow-auto bg-gray-200 rounded">
                    <code>
                        {`.env
.env.dev
.env.stg
.env.prod`}
                    </code>
                </pre>

                <h2 className="mb-2 text-2xl font-semibold">Usage</h2>
                <p className="mb-4">To switch environments, use the following command:</p>
                <pre className="p-4 mb-4 overflow-auto bg-gray-200 rounded">
                    <code>switchenv [env]</code>
                </pre>
                <p>Where <code className="px-2 py-1 bg-gray-200 rounded">[env]</code> can be <code className="px-2 py-1 bg-gray-200 rounded">dev</code>, <code className="px-2 py-1 bg-gray-200 rounded">stg</code>, or <code className="px-2 py-1 bg-gray-200 rounded">prod</code>.</p>
                <h2 className="mt-4 mb-2 text-2xl font-semibold">
                    Thanks for using <span className="text-blue-500">Switchenv</span>! 🚀
                </h2>
            </div>
        </div>
    );
};

export default SwitchenvInstallation;
