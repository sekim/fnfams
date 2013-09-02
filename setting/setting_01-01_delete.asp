<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim Rs, ConnFF, strSQL
	Dim cust_cd
	
	cust_cd = Request("cust_cd")
	
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "delete AM_ACM010 where   cust_cd in ('" + cust_cd + "')"
	ConnFF.Execute strSQL
	'response.write(strSQL)
%>