import React from 'react';
import { ReactComponent as Close } from 'assets/icons/x.svg';
import './index.scss';

interface Props {
    title: string;
    children: React.ReactNode;
}

export default function Pane({ title, children }: Props) {
    return (
        <div className="pane-container">
            <div className="pane-container_header">
                <span className="pane-container_header_title">{title}</span>
                <i className="pane-container_header_close">
                    <Close />
                </i>
            </div>
            <div className="pane-container_content">{children}</div>
        </div>
    );
}
