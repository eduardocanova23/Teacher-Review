import React from "react";
import { useEffect, useState } from "react";
import { useSubjectList } from "./useSubjectList";
export const useDescription = () => {
    const [inputDescription, setDescription] = React.useState("");

    const handleDescriptionInput = (event) => {
        setDescription(event.target.value)
    }

    return {inputDescription, handleDescriptionInput};
};