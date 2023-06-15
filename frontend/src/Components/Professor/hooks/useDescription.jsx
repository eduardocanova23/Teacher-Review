import React from "react";
import axios from "axios";
import config from '../../../config'

export const useDescription = () => {
    const [reviewList, setReviewList] = React.useState([]);
   
    const handleReviewList = async (newValue) => {
        if(newValue){
            const response = await axios.post(
                config.api_url + '/get-teacher-subjects',
                {
                    "id": newValue["id"]
                }
            )
            if (response.status == 200) {
                const subjects = response["data"]["subjects"].map((subj) => {
                    return {
                        'id': subj.review_id,
                        'decription': subj.description,
                        'date': subj.report_time,
                        'name': subj.name
                    }
                })
                setReviewList(subjects)
            }
        }
    };

    return {reviewList, handleReviewList};
};