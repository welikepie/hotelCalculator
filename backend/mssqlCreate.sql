USE [TestDB]
GO

/****** Object:  Table [dbo].[inputs]    Script Date: 18/10/2013 19:16:19 ******/
DROP TABLE [dbo].[inputs]
GO

/****** Object:  Table [dbo].[inputs]    Script Date: 18/10/2013 19:16:19 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[inputs](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[numberofrooms] [int] NOT NULL,
	[currency] [nvarchar](15) NOT NULL,
	[averageroomrate] [int] NULL,
	[contactInput] [nvarchar](50) NULL,
	[emailInput] [nvarchar](50) NULL,
	[phoneInput] [nvarchar](50) NULL,
	[companyInput] [nvarchar](50) NULL,
	[transactionCountOutput] [float] NULL,
	[ATVOutput] [float] NULL,
	[turnoverOutput] [float] NULL,
	[valueMinOutput] [float] NULL,
	[upsellOutput] [float] NULL,
 CONSTRAINT [PrimaryKey_3a7d7472-c220-423a-afaf-857f7addccc8] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO


