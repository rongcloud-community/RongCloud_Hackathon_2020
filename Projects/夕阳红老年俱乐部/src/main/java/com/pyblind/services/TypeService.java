package com.pyblind.services;

import com.pyblind.dao.ITypeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypeService {
    @Autowired
    ITypeDao iTypeDao;
}
