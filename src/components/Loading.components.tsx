'use client';

import { Loader2 } from "lucide-react";

export const Loading = () => {
    return(
        <div className="fixed top-0 left-0 z-50 h-dvh w-dvw bg-background flex items-center justify-center">
            <Loader2 className="animate-spin w-8 h-8"/>
        </div>
    )
}