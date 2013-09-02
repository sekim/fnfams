<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim Rs, ConnFF, strSQL, jsonText, custCd
	CustCd = request.querystring("cust_cd")
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "select * from am_sgm010 where cust_cd = '" & CustCd & "' and peer_depth = 0"
	jsonText = QueryToJSON(ConnFF, strSQL).Flush
	'response.write(strSQL)
	Response.Write(jsonText)
%>