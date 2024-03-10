// ErrorBoundary.tsx

import {Component, ReactNode} from 'react';
import ServerError from './ServerError'; // Import your ServerError component

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return {hasError: true};
    }

    // componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    //     console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // }

    render() {
        if (this.state.hasError) {
            return <ServerError/>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
