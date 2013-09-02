<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim ConnFF, strSQL, jsonText
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "select * from AM_ACM010 order by cust_cd asc"
	jsonText = QueryToJSON(ConnFF, strSQL).Flush
	Response.Write(jsonText)
%>