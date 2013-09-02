<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim Rs, ConnFF, strSQL
	Dim cust_cd, fund_cd, fund_cd_s
	cust_cd = Request("cust_cd")
	fund_cd = Request("fund_cd")
	fund_cd_s = Request("fund_cd_s")
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "delete AM_FBM010 where cust_cd = '" + cust_cd + "' and fund_cd in ('" + fund_cd + "')"
	'response.write(strSQL&"<br>")
	ConnFF.Execute strSQL
	strSQL = "delete AM_FBT010 where cust_cd = '" + cust_cd + "' and fund_cd in ('" + fund_cd + "')"
	'response.write(strSQL&"\n")
	ConnFF.Execute strSQL
	strSQL = "delete AM_FBM020 where cust_cd = '" + cust_cd + "' and fund_cd_s = '" & fund_cd_s & "' and fund_cd in ('" + fund_cd + "')"
	'response.write(strSQL)
	ConnFF.Execute strSQL
	ConnFF.Close
	Set ConnFF = Nothing
%>