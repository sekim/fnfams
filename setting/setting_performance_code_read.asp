<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim Rs, ConnFF, strSQL, jsonText, custCd, peerCd
	custCd = request.querystring("cust_cd")
	peerCd = request.querystring("peer_cd")
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "select * from am_sgm010 where cust_cd = '" & custCd & "' and peer_cd like '" & peerCd & "%' and peer_depth <> 0"
	jsonText = QueryToJSON(ConnFF, strSQL).Flush
	'response.write(strSQL)
	Response.Write(jsonText)
%>