<?xml version="1.0" encoding="utf-8" ?> 
<xsl:stylesheet   version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="VS">
		<xsl:apply-templates select="T"/>
	</xsl:template>
	<xsl:template match="T">
		<xsl:param name="ref_f"><xsl:value-of select="@f"/></xsl:param>	
		<xsl:param name="ref_u"><xsl:value-of select="@u"/></xsl:param>	
		<Table border="0" cellspacing="1" cellpadding="2"  style="font-size: 13px">
				<xsl:attribute name="STYLE">margin-top:2</xsl:attribute>
				<xsl:attribute name="WIDTH">100%</xsl:attribute>
			<TR><TD valign="middle" nowrap="true" bgcolor="orange">时间:<xsl:value-of select="@t"/></TD></TR>
			<TR><TD valign="middle" nowrap="true" bgcolor="lightblue" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;">
			<a href="#">
				<xsl:attribute name="title"><xsl:value-of select="@f"/></xsl:attribute>
				<xsl:attribute name="onclick">openlink('<xsl:value-of select="@f"/>');</xsl:attribute>
				<xsl:choose>
					<xsl:when test="@f=''">直接输入或从收藏夹</xsl:when>
					<xsl:when test="@ot">
						从外部
					</xsl:when>
					<xsl:when test="@f='/'">从首页</xsl:when>
					<xsl:otherwise>
						<xsl:choose>
							<xsl:when test="string-length(@f)>20">从...<xsl:value-of select="substring($ref_f,string-length($ref_f)-19,20)"/></xsl:when>
							<xsl:otherwise>从<xsl:value-of select="@f"/></xsl:otherwise>
						</xsl:choose>
					</xsl:otherwise>
				</xsl:choose>
			</a></TD></TR>
			<TR><TD bgcolor="lightblue"  style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;">
			进入
			<a href="#">
				<xsl:attribute name="title"><xsl:value-of select="@u"/></xsl:attribute>
				<xsl:attribute name="onclick">openlink('<xsl:value-of select="@u"/>');</xsl:attribute>
				<xsl:choose>
					<xsl:when test="@u='/'">首页</xsl:when>
					<xsl:otherwise>
						<xsl:choose>
							<xsl:when test="string-length(@u)>20">...<xsl:value-of select="substring($ref_u,string-length($ref_u)-19,20)"/></xsl:when>
							<xsl:otherwise><xsl:value-of select="@u"/></xsl:otherwise>
						</xsl:choose>
					</xsl:otherwise>
				</xsl:choose>
			</a>
			</TD></TR>
		</Table>
	</xsl:template>
	<xsl:template match="I">
		<Table border="0" cellspacing="1" cellpadding="2" style="font-size: 13px">
				<xsl:attribute name="STYLE">margin-top: 2</xsl:attribute>
				<xsl:attribute name="WIDTH">100%</xsl:attribute>
			<TR><TD align="left" nowrap="true" width="50" bgcolor="orange">IP</TD><TD align="center" bgcolor="lightblue"><xsl:value-of select="@i"/></TD></TR>
			<TR><TD align="left" nowrap="true" bgcolor="orange">地域</TD><TD align="center" bgcolor="lightblue"><xsl:value-of select="@a"/></TD></TR>
			<TR><TD align="left" nowrap="true" bgcolor="orange">关键词</TD><TD align="center" bgcolor="lightblue"><xsl:value-of select="@k"/></TD></TR>
			<TR><TD align="left" nowrap="true" bgcolor="orange">来源</TD><TD align="center" bgcolor="lightblue"><xsl:value-of select="@e"/></TD></TR>
		</Table>
	</xsl:template>
	<xsl:template match="RapidMsg">
		<xsl:apply-templates select="RapidGroup"/>
	</xsl:template>	
	<xsl:template match="RapidGroup">
		<Table border="0" cellspacing="1" cellpadding="2" width="100%"  style="cursor:hand">
			<TR><TD align="center" nowrap="true" bgcolor="orange"><xsl:value-of select="@value"/></TD></TR>
			<TR><TD align="left" valign="top">
				<Table border="0" width="100%">
					<xsl:for-each select="./msg">
						<TR><TD onclick="setText(this);" ondblclick="sendText(this);" bgcolor="#eff3ff">
							<xsl:attribute name="title"><xsl:value-of select="@value"/></xsl:attribute>
							<xsl:attribute name="init"><xsl:value-of select="../@value"/></xsl:attribute>
							<xsl:value-of select="substring(@value,1,8)"/>...
						</TD></TR>
					</xsl:for-each>
				</Table>
			</TD></TR>
		</Table>
	</xsl:template>		
</xsl:stylesheet>
