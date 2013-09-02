<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim Rs, ConnFF, strSQL
	Dim cust_cd, cust_nm, cust_snm, cust_gb, co_cd, rmrk
	
	cust_cd = Request("cust_cd")
	cust_nm = Request("cust_nm")
	cust_snm = Request("cust_snm")
	cust_gb = Request("cust_gb")
	co_cd = Request("co_cd")
	rmrk = Request("rmrk")
	use_yn = Request("use_yn")
	work_id = Request("work_id")
	
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "update AM_ACM010 set cust_nm = '" + cust_nm + "', cust_snm = '" + cust_snm + "', cust_gb='" + cust_gb + "', co_cd='" + co_cd + "', rmrk='" + rmrk + "', use_yn='" + use_yn + "' , work_id='" + work_id + "' where   cust_cd = '" + cust_cd + "'"
	ConnFF.Execute strSQL
	'response.write(strSQL)
%>