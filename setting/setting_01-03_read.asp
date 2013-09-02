<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim Rs, ConnFF, strSQL, jsonText
	Dim cust_cd, fund_cd_s
	cust_cd = Request("cust_cd")
	fund_cd_s = Request("fund_cd_s")
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "select a.* "
	strSQL = strSQL & "from    am_fbm010 a, "
    strSQL = strSQL & "( "
    strSQL = strSQL & "select  cust_cd, fund_cd "
    strSQL = strSQL & "from    am_fbm020 "
    strSQL = strSQL & "where   cust_cd = '" & cust_cd & "' "
    strSQL = strSQL & "and     fund_cd_s = '" & fund_cd_s & "' "
    strSQL = strSQL & ") b "
	strSQL = strSQL & "where   a.cust_cd = b.cust_cd "
	strSQL = strSQL & "and     a.fund_cd = b.fund_cd"
	'Response.write(strSQL)
	jsonText = QueryToJSON(ConnFF, strSQL).Flush
	Response.Write(jsonText)
%>