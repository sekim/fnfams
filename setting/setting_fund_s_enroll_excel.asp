<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<!--#Include virtual="/fng/common_inc.asp"-->
<%
	Response.Buffer = True
	Response.Clear
	Response.ContentType = "application/vnd.ms-excel; charset=utf-8" 
	Response.CacheControl = "private"
	Response.AddHeader "cache-control","private"
	Response.AddHeader "Pragma","no-cache"

	dim filename
	filename = request.querystring("filename")
	if filename = "" then filename = "fams" end if

	Response.AddHeader "content-disposition", "Attachment; filename=" & filename & ".xls"

	'여기부터 sp 정보 수정'
	
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
    strSQL = strSQL & "select  cust_cd, fund_cd_s "
    strSQL = strSQL & "from    am_fbm020 "
    strSQL = strSQL & "where   cust_cd = '" & cust_cd & "' "
    strSQL = strSQL & "and     fund_cd = '" & fund_cd_s & "' "
    strSQL = strSQL & ") b "
	strSQL = strSQL & "where   a.cust_cd = b.cust_cd "
	strSQL = strSQL & "and     a.fund_cd = b.fund_cd_s"
	'Response.write(strSQL)
	Set Rs = ConnFF.Execute(strSQL)

	'여기까지 sp 정보 수정'
	'마지막 줄은 rs 받도록 수정'

%>
<html>
<head>
<meta http-equiv="Content-Type" content="application/vnd.ms-excel; charset=utf-8" />
<style type="text/css">
body, table, tr, td {
	font-family:돋움, seoul, arial, verdana;
	font-size:12px;
	line-height:120%;
}
</style>
</head>
<body>
	<table  cellpadding="0" cellspacing="0">
		<thead>
			<tr>
				<th>펀드코드</th>
				<th>펀드명</th>
				<th>펀드유형</th>
				<th>펀드설정일</th>
				<th>최초투자일</th>
				<th>운용사</th>
			</tr>
		</thead>
		<tbody>
<%  
	If Rs.BOF Or Rs.EOF Then 
%>
			<tr>
				<td colspan = "6"> 데이타가 존재하지 않습니다. </td>
			</tr>
<%
	else
		Do While Not Rs.eof
%>
			<tr>
				<td><%=Rs("FUND_CD")%></td>
				<td><%=Rs("FUND_NM")%></td>
				<td><%=Rs("PEER_CD")%></td>
				<td><%=Rs("SET_DT")%></td>
				<td><%=Rs("FST_TRD_DT")%></td>
				<td><%=Rs("CO_NM")%></td>
			</tr>
<%	
			Rs.Movenext
		loop	
	End if
%>	
		</tbody>
	</table>

<%
	Rs.Close
	Set Rs = Nothing
	ConnFF.Close
	Set ConnFF = Nothing
%>	
</body>
</html>