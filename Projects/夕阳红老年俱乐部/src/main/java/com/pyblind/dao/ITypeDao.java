package com.pyblind.dao;

import com.base.IBaseDao;
import com.pyblind.entity.User;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface ITypeDao extends IBaseDao<User, Serializable>{
}
