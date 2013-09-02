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
	
	Dim Rs, ConnFF, strSQL
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "select * from AM_ACM010 order by cust_cd asc"
	Set Rs = ConnFF.Execute(strSQL)
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
	<table  cellpadding="0" cellspacing="0"   border="1" bordercolor="#969696" >
		<thead>
			<tr>
				<th bgcolor="#D3E1EB">고객번호</th>
				<th bgcolor="#D3E1EB">고객명(전체)</th>
				<th bgcolor="#D3E1EB">고객명(약어)</th>
				<th bgcolor="#D3E1EB">고객구분</th>
				<th bgcolor="#D3E1EB">법인코드</th>
				<th bgcolor="#D3E1EB">비고</th>
				<th bgcolor="#D3E1EB">사용여부</th>
			</tr>
		</thead>
		<tbody>
<%  
	If Rs.BOF Or Rs.EOF Then 
%>
			<tr>
				<td colspan = "7"> 데이타가 존재하지 않습니다. </td>
			</tr>
<%
	else
		Do While Not Rs.eof
%>
			<tr>
				<td><%=Rs("CUST_CD")%></td>
				<td><%=Rs("CUST_NM")%></td>
				<td><%=Rs("CUST_SNM")%></td>
				<td><%=Rs("CUST_GB")%></td>
				<td><%=Rs("CO_CD")%></td>
				<td><%=Rs("RMRK")%></td>
				<td><%=Rs("USE_YN")%></td>
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