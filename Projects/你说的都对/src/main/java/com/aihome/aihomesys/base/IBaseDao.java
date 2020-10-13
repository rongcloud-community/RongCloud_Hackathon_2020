package com.aihome.aihomesys.base;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IBaseDao<T , PK extends Serializable> {
	/**
	 * 获取所有对象列表
	 */
	List<T> findAll();
	
	/**
	 * 根据条件Map集合获取对象列表
	 */
	List<T> listByConditions(Map<String, Object> map);
	
	/**
	 * 根据条件Map集合获取总数量
	 */
	Long countByConditions(Map<String, Object> map);
	
	/**
	 * 根据主键获取对象
	 */
	T findById(PK id);
	
	/**
	 * 插入对象
	 */
	int insert(T object);
	
	/**
	 * 插入List集合对象
	 */
	int insertList(List<T> object);
	
	/**
	 * 修改对象
	 */
	int update(T object);

	/**
	 * 根据主键ID删除一条数据
	 */
	int deleteById(PK id);
	
}
