import React from 'react'
import { MessageListProps } from "@/types";
import { cn } from "@/lib/utils";

const MessageList = ({ messages }: MessageListProps) => {
    if (!messages) return <React.Fragment></React.Fragment>;

    return (
        <div className="flex flex-col gap-2 px-4">
            {messages.map(message => {
                return (
                    <div key={message.id} className={cn('flex', {
                        'justify-end pl-10': message.role === 'user',
                        'justify-start pr-10': message.role === 'assistant'
                    })}>
                        <div className={cn('rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10', {
                            'bg-blue-600 text-white': message.role === 'user'
                        })}>
                            <p>{message.content}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default MessageList;