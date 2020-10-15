package com.pyblind.services;


import com.pyblind.dao.IFeedbackDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {
    @Autowired
    IFeedbackDao iFeedbackDao;

    public void insertNew(Long id, String title, String content, String nowtime) {
        this.iFeedbackDao.insertNew(id,title,content,nowtime);
    }
}
