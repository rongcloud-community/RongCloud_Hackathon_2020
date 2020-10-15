/*
 * Generated by MyEclipse Struts
 * Template path: templates/java/JavaClass.vtl
 */
package com.center.control;

import javax.servlet.http.HttpServletRequest;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

/** 
 * MyEclipse Struts
 * Creation date: 05-16-2007
 * 
 * XDoclet definition:
 * @struts.form name="goodUpdateForm"
 */
public class GoodForm extends ActionForm {
	/*
	 * Generated fields
	 */

	/** goodtype property */
	private String goodtype;

	/** goodpublisher property */
	private String goodpublisher;

	/** goodprice property */
	private double goodprice;

	/** gooddesc property */
	private String gooddesc;

	/** goodname property */
	private String goodname;

	/** id property */
	private int id;

	/*
	 * Generated Methods
	 */

	/** 
	 * Method validate
	 * @param mapping
	 * @param request
	 * @return ActionErrors
	 */
	public ActionErrors validate(ActionMapping mapping,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return null;
	}

	/** 
	 * Method reset
	 * @param mapping
	 * @param request
	 */
	public void reset(ActionMapping mapping, HttpServletRequest request) {
		// TODO Auto-generated method stub
	}

	/** 
	 * Returns the goodtype.
	 * @return String
	 */
	public String getGoodtype() {
		return goodtype;
	}

	/** 
	 * Set the goodtype.
	 * @param goodtype The goodtype to set
	 */
	public void setGoodtype(String goodtype) {
		this.goodtype = goodtype;
	}

	/** 
	 * Returns the goodpublisher.
	 * @return String
	 */
	public String getGoodpublisher() {
		return goodpublisher;
	}

	/** 
	 * Set the goodpublisher.
	 * @param goodpublisher The goodpublisher to set
	 */
	public void setGoodpublisher(String goodpublisher) {
		this.goodpublisher = goodpublisher;
	}

	/** 
	 * Returns the goodprice.
	 * @return double
	 */
	public double getGoodprice() {
		return goodprice;
	}

	/** 
	 * Set the goodprice.
	 * @param goodprice The goodprice to set
	 */
	public void setGoodprice(double goodprice) {
		this.goodprice = goodprice;
	}

	/** 
	 * Returns the gooddesc.
	 * @return String
	 */
	public String getGooddesc() {
		return gooddesc;
	}

	/** 
	 * Set the gooddesc.
	 * @param gooddesc The gooddesc to set
	 */
	public void setGooddesc(String gooddesc) {
		this.gooddesc = gooddesc;
	}

	/** 
	 * Returns the goodname.
	 * @return String
	 */
	public String getGoodname() {
		return goodname;
	}

	/** 
	 * Set the goodname.
	 * @param goodname The goodname to set
	 */
	public void setGoodname(String goodname) {
		this.goodname = goodname;
	}

	/** 
	 * Returns the id.
	 * @return int
	 */
	public int getId() {
		return id;
	}

	/** 
	 * Set the id.
	 * @param id The id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
}