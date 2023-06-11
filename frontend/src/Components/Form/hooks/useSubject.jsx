import React from "react";
import { useEffect, useState } from "react";
export const useSubject = () => {
    const [inputSubject, setSubject] = React.useState("");

    const handleSubjectInput = (event, newValue) => {
        setSubject(newValue)
    }

    return {inputSubject, handleSubjectInput};
};