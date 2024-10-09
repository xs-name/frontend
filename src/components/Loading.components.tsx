'use client';

import { Loader2 } from "lucide-react";

export const Loading = () => {
    return(
        // <div className="fixed top-0 left-0 z-50 h-dvh w-dvw bg-background flex items-center justify-center">
        //     <Loader2 className="animate-spin w-8 h-8"/>
        // </div>
        <div className="pyramid-loader">
            <div className="wrapper-loader">
                <span className="side-loader side1-loader"></span>
                <span className="side-loader side2-loader"></span>
                <span className="side-loader side3-loader"></span>
                <span className="side-loader side4-loader"></span>
                <span className="shadow-loader"></span>
            </div>
            <div className="flex mt-2 items-center gap-2 font-bold text-[18px] tracking-wider"><div>XSNAME</div></div>
        </div>
        
    )
}