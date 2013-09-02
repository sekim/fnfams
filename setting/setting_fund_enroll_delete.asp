<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim Rs, ConnFF, strSQL
	Dim cust_cd, fund_cd
	cust_cd = Request("cust_cd")
	fund_cd = Request("fund_cd")
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "delete AM_FBM010 where cust_cd = '" + cust_cd + "' and fund_cd in ('" + fund_cd + "')"
	'response.write(strSQL)
	ConnFF.Execute strSQL
	strSQL = "delete AM_FBT010 where cust_cd = '" + cust_cd + "' and fund_cd in ('" + fund_cd + "')"
	'response.write(strSQL)
	ConnFF.Execute strSQL
	ConnFF.Close
	Set ConnFF = Nothing
%>