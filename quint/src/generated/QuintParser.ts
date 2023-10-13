// Generated from ./src/generated/Quint.g4 by ANTLR 4.9.0-SNAPSHOT



// Used for forming errors
import { quintErrorToString } from '../quintError'



import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { QuintListener } from "./QuintListener";
import { QuintVisitor } from "./QuintVisitor";


export class QuintParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly T__33 = 34;
	public static readonly T__34 = 35;
	public static readonly T__35 = 36;
	public static readonly T__36 = 37;
	public static readonly T__37 = 38;
	public static readonly T__38 = 39;
	public static readonly STRING = 40;
	public static readonly BOOL = 41;
	public static readonly INT = 42;
	public static readonly AND = 43;
	public static readonly OR = 44;
	public static readonly IFF = 45;
	public static readonly IMPLIES = 46;
	public static readonly SET = 47;
	public static readonly LIST = 48;
	public static readonly MAP = 49;
	public static readonly MATCH = 50;
	public static readonly PLUS = 51;
	public static readonly MINUS = 52;
	public static readonly MUL = 53;
	public static readonly DIV = 54;
	public static readonly MOD = 55;
	public static readonly GT = 56;
	public static readonly LT = 57;
	public static readonly GE = 58;
	public static readonly LE = 59;
	public static readonly NE = 60;
	public static readonly EQ = 61;
	public static readonly ASGN = 62;
	public static readonly LPAREN = 63;
	public static readonly RPAREN = 64;
	public static readonly IDENTIFIER = 65;
	public static readonly DOCCOMMENT = 66;
	public static readonly LINE_COMMENT = 67;
	public static readonly COMMENT = 68;
	public static readonly WS = 69;
	public static readonly RULE_modules = 0;
	public static readonly RULE_module = 1;
	public static readonly RULE_documentedDeclaration = 2;
	public static readonly RULE_declaration = 3;
	public static readonly RULE_operDef = 4;
	public static readonly RULE_typeDef = 5;
	public static readonly RULE_typeSumVariant = 6;
	public static readonly RULE_nondetOperDef = 7;
	public static readonly RULE_qualifier = 8;
	public static readonly RULE_importMod = 9;
	public static readonly RULE_exportMod = 10;
	public static readonly RULE_instanceMod = 11;
	public static readonly RULE_moduleName = 12;
	public static readonly RULE_name = 13;
	public static readonly RULE_qualifiedName = 14;
	public static readonly RULE_fromSource = 15;
	public static readonly RULE_type = 16;
	public static readonly RULE_typeUnionRecOne = 17;
	public static readonly RULE_row = 18;
	public static readonly RULE_rowLabel = 19;
	public static readonly RULE_expr = 20;
	public static readonly RULE_matchSumExpr = 21;
	public static readonly RULE_matchSumCase = 22;
	public static readonly RULE_matchSumVariant = 23;
	public static readonly RULE_declarationOrExpr = 24;
	public static readonly RULE_lambda = 25;
	public static readonly RULE_lambdaUnsugared = 26;
	public static readonly RULE_lambdaTupleSugar = 27;
	public static readonly RULE_identOrHole = 28;
	public static readonly RULE_parameter = 29;
	public static readonly RULE_identOrStar = 30;
	public static readonly RULE_argList = 31;
	public static readonly RULE_recElem = 32;
	public static readonly RULE_normalCallName = 33;
	public static readonly RULE_nameAfterDot = 34;
	public static readonly RULE_operator = 35;
	public static readonly RULE_literal = 36;
	public static readonly RULE_qualId = 37;
	public static readonly RULE_simpleId = 38;
	public static readonly RULE_empty = 39;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"modules", "module", "documentedDeclaration", "declaration", "operDef", 
		"typeDef", "typeSumVariant", "nondetOperDef", "qualifier", "importMod", 
		"exportMod", "instanceMod", "moduleName", "name", "qualifiedName", "fromSource", 
		"type", "typeUnionRecOne", "row", "rowLabel", "expr", "matchSumExpr", 
		"matchSumCase", "matchSumVariant", "declarationOrExpr", "lambda", "lambdaUnsugared", 
		"lambdaTupleSugar", "identOrHole", "parameter", "identOrStar", "argList", 
		"recElem", "normalCallName", "nameAfterDot", "operator", "literal", "qualId", 
		"simpleId", "empty",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'module'", "'{'", "'}'", "'const'", "':'", "'var'", "'assume'", 
		"','", "';'", "'type'", "'|'", "'nondet'", "'val'", "'def'", "'pure'", 
		"'action'", "'run'", "'temporal'", "'import'", "'.'", "'from'", "'as'", 
		"'export'", "'->'", "'=>'", "'['", "']'", "'int'", "'str'", "'bool'", 
		"'^'", "'''", "'all'", "'any'", "'if'", "'else'", "'_'", "'...'", "'::'", 
		undefined, undefined, undefined, "'and'", "'or'", "'iff'", "'implies'", 
		"'Set'", "'List'", "'Map'", "'match'", "'+'", "'-'", "'*'", "'/'", "'%'", 
		"'>'", "'<'", "'>='", "'<='", "'!='", "'=='", "'='", "'('", "')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, "STRING", "BOOL", 
		"INT", "AND", "OR", "IFF", "IMPLIES", "SET", "LIST", "MAP", "MATCH", "PLUS", 
		"MINUS", "MUL", "DIV", "MOD", "GT", "LT", "GE", "LE", "NE", "EQ", "ASGN", 
		"LPAREN", "RPAREN", "IDENTIFIER", "DOCCOMMENT", "LINE_COMMENT", "COMMENT", 
		"WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(QuintParser._LITERAL_NAMES, QuintParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return QuintParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Quint.g4"; }

	// @Override
	public get ruleNames(): string[] { return QuintParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return QuintParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(QuintParser._ATN, this);
	}
	// @RuleVersion(0)
	public modules(): ModulesContext {
		let _localctx: ModulesContext = new ModulesContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, QuintParser.RULE_modules);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 81;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 80;
				this.module();
				}
				}
				this.state = 83;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === QuintParser.T__0 || _la === QuintParser.DOCCOMMENT);
			this.state = 85;
			this.match(QuintParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public module(): ModuleContext {
		let _localctx: ModuleContext = new ModuleContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, QuintParser.RULE_module);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 90;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === QuintParser.DOCCOMMENT) {
				{
				{
				this.state = 87;
				this.match(QuintParser.DOCCOMMENT);
				}
				}
				this.state = 92;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 93;
			this.match(QuintParser.T__0);
			this.state = 94;
			this.qualId();
			this.state = 95;
			this.match(QuintParser.T__1);
			this.state = 99;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << QuintParser.T__3) | (1 << QuintParser.T__5) | (1 << QuintParser.T__6) | (1 << QuintParser.T__9) | (1 << QuintParser.T__12) | (1 << QuintParser.T__13) | (1 << QuintParser.T__14) | (1 << QuintParser.T__15) | (1 << QuintParser.T__16) | (1 << QuintParser.T__17) | (1 << QuintParser.T__18) | (1 << QuintParser.T__22))) !== 0) || _la === QuintParser.DOCCOMMENT) {
				{
				{
				this.state = 96;
				this.documentedDeclaration();
				}
				}
				this.state = 101;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 102;
			this.match(QuintParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public documentedDeclaration(): DocumentedDeclarationContext {
		let _localctx: DocumentedDeclarationContext = new DocumentedDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, QuintParser.RULE_documentedDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 107;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === QuintParser.DOCCOMMENT) {
				{
				{
				this.state = 104;
				this.match(QuintParser.DOCCOMMENT);
				}
				}
				this.state = 109;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 110;
			this.declaration();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public declaration(): DeclarationContext {
		let _localctx: DeclarationContext = new DeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, QuintParser.RULE_declaration);
		try {
			this.state = 132;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				_localctx = new ConstContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 112;
				this.match(QuintParser.T__3);
				this.state = 113;
				this.qualId();
				this.state = 114;
				this.match(QuintParser.T__4);
				this.state = 115;
				this.type(0);
				}
				break;

			case 2:
				_localctx = new VarContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 117;
				this.match(QuintParser.T__5);
				this.state = 118;
				this.qualId();
				this.state = 119;
				this.match(QuintParser.T__4);
				this.state = 120;
				this.type(0);
				}
				break;

			case 3:
				_localctx = new AssumeContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 122;
				this.match(QuintParser.T__6);
				this.state = 123;
				this.identOrHole();
				this.state = 124;
				this.match(QuintParser.ASGN);
				this.state = 125;
				this.expr(0);
				}
				break;

			case 4:
				_localctx = new InstanceContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 127;
				this.instanceMod();
				}
				break;

			case 5:
				_localctx = new OperContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 128;
				this.operDef();
				}
				break;

			case 6:
				_localctx = new TypeDefsContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 129;
				this.typeDef();
				}
				break;

			case 7:
				_localctx = new ImportDefContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 130;
				this.importMod();
				}
				break;

			case 8:
				_localctx = new ExportDefContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 131;
				this.exportMod();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operDef(): OperDefContext {
		let _localctx: OperDefContext = new OperDefContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, QuintParser.RULE_operDef);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 134;
			this.qualifier();
			this.state = 135;
			this.normalCallName();
			this.state = 172;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 136;
				this.match(QuintParser.LPAREN);
				this.state = 145;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__36 || _la === QuintParser.IDENTIFIER) {
					{
					this.state = 137;
					this.parameter();
					this.state = 142;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === QuintParser.T__7) {
						{
						{
						this.state = 138;
						this.match(QuintParser.T__7);
						this.state = 139;
						this.parameter();
						}
						}
						this.state = 144;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 147;
				this.match(QuintParser.RPAREN);
				this.state = 150;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__4) {
					{
					this.state = 148;
					this.match(QuintParser.T__4);
					this.state = 149;
					this.type(0);
					}
				}

				}
				break;

			case 2:
				{
				this.state = 152;
				this.match(QuintParser.T__4);
				this.state = 153;
				this.type(0);
				}
				break;

			case 3:
				{
				this.state = 154;
				this.match(QuintParser.LPAREN);
				{
				this.state = 155;
				this.parameter();
				this.state = 156;
				this.match(QuintParser.T__4);
				this.state = 157;
				this.type(0);
				this.state = 165;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === QuintParser.T__7) {
					{
					{
					this.state = 158;
					this.match(QuintParser.T__7);
					this.state = 159;
					this.parameter();
					this.state = 160;
					this.match(QuintParser.T__4);
					this.state = 161;
					this.type(0);
					}
					}
					this.state = 167;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				this.state = 168;
				this.match(QuintParser.RPAREN);
				this.state = 169;
				this.match(QuintParser.T__4);
				this.state = 170;
				this.type(0);
				}
				break;
			}
			this.state = 176;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === QuintParser.ASGN) {
				{
				this.state = 174;
				this.match(QuintParser.ASGN);
				this.state = 175;
				this.expr(0);
				}
			}

			this.state = 179;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === QuintParser.T__8) {
				{
				this.state = 178;
				this.match(QuintParser.T__8);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeDef(): TypeDefContext {
		let _localctx: TypeDefContext = new TypeDefContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, QuintParser.RULE_typeDef);
		let _la: number;
		try {
			this.state = 202;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				_localctx = new TypeAbstractDefContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 181;
				this.match(QuintParser.T__9);
				this.state = 182;
				this.qualId();
				}
				break;

			case 2:
				_localctx = new TypeAliasDefContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 183;
				this.match(QuintParser.T__9);
				this.state = 184;
				this.qualId();
				this.state = 185;
				this.match(QuintParser.ASGN);
				this.state = 186;
				this.type(0);
				}
				break;

			case 3:
				_localctx = new TypeSumDefContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 188;
				this.match(QuintParser.T__9);
				this.state = 189;
				(_localctx as TypeSumDefContext)._typeName = this.qualId();
				this.state = 190;
				this.match(QuintParser.ASGN);
				this.state = 192;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__10) {
					{
					this.state = 191;
					this.match(QuintParser.T__10);
					}
				}

				this.state = 194;
				this.typeSumVariant();
				this.state = 199;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === QuintParser.T__10) {
					{
					{
					this.state = 195;
					this.match(QuintParser.T__10);
					this.state = 196;
					this.typeSumVariant();
					}
					}
					this.state = 201;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeSumVariant(): TypeSumVariantContext {
		let _localctx: TypeSumVariantContext = new TypeSumVariantContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, QuintParser.RULE_typeSumVariant);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 204;
			_localctx._sumLabel = this.simpleId("variant label");
			this.state = 209;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === QuintParser.LPAREN) {
				{
				this.state = 205;
				this.match(QuintParser.LPAREN);
				this.state = 206;
				this.type(0);
				this.state = 207;
				this.match(QuintParser.RPAREN);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nondetOperDef(): NondetOperDefContext {
		let _localctx: NondetOperDefContext = new NondetOperDefContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, QuintParser.RULE_nondetOperDef);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 211;
			this.match(QuintParser.T__11);
			this.state = 212;
			this.qualId();
			this.state = 215;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === QuintParser.T__4) {
				{
				this.state = 213;
				this.match(QuintParser.T__4);
				this.state = 214;
				this.type(0);
				}
			}

			this.state = 217;
			this.match(QuintParser.ASGN);
			this.state = 218;
			this.expr(0);
			this.state = 220;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === QuintParser.T__8) {
				{
				this.state = 219;
				this.match(QuintParser.T__8);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifier(): QualifierContext {
		let _localctx: QualifierContext = new QualifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, QuintParser.RULE_qualifier);
		try {
			this.state = 231;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 222;
				this.match(QuintParser.T__12);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 223;
				this.match(QuintParser.T__13);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 224;
				this.match(QuintParser.T__14);
				this.state = 225;
				this.match(QuintParser.T__12);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 226;
				this.match(QuintParser.T__14);
				this.state = 227;
				this.match(QuintParser.T__13);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 228;
				this.match(QuintParser.T__15);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 229;
				this.match(QuintParser.T__16);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 230;
				this.match(QuintParser.T__17);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public importMod(): ImportModContext {
		let _localctx: ImportModContext = new ImportModContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, QuintParser.RULE_importMod);
		let _la: number;
		try {
			this.state = 251;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 233;
				this.match(QuintParser.T__18);
				this.state = 234;
				this.name();
				this.state = 235;
				this.match(QuintParser.T__19);
				this.state = 236;
				this.identOrStar();
				this.state = 239;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__20) {
					{
					this.state = 237;
					this.match(QuintParser.T__20);
					this.state = 238;
					this.fromSource();
					}
				}

				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 241;
				this.match(QuintParser.T__18);
				this.state = 242;
				this.name();
				this.state = 245;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__21) {
					{
					this.state = 243;
					this.match(QuintParser.T__21);
					this.state = 244;
					this.name();
					}
				}

				this.state = 249;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__20) {
					{
					this.state = 247;
					this.match(QuintParser.T__20);
					this.state = 248;
					this.fromSource();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public exportMod(): ExportModContext {
		let _localctx: ExportModContext = new ExportModContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, QuintParser.RULE_exportMod);
		let _la: number;
		try {
			this.state = 264;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 253;
				this.match(QuintParser.T__22);
				this.state = 254;
				this.name();
				this.state = 255;
				this.match(QuintParser.T__19);
				this.state = 256;
				this.identOrStar();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 258;
				this.match(QuintParser.T__22);
				this.state = 259;
				this.name();
				this.state = 262;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__21) {
					{
					this.state = 260;
					this.match(QuintParser.T__21);
					this.state = 261;
					this.name();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public instanceMod(): InstanceModContext {
		let _localctx: InstanceModContext = new InstanceModContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, QuintParser.RULE_instanceMod);
		let _la: number;
		try {
			this.state = 312;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 29, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 266;
				this.match(QuintParser.T__18);
				this.state = 267;
				this.moduleName();
				this.state = 268;
				this.match(QuintParser.LPAREN);
				{
				this.state = 269;
				this.name();
				this.state = 270;
				this.match(QuintParser.ASGN);
				this.state = 271;
				this.expr(0);
				this.state = 279;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === QuintParser.T__7) {
					{
					{
					this.state = 272;
					this.match(QuintParser.T__7);
					this.state = 273;
					this.name();
					this.state = 274;
					this.match(QuintParser.ASGN);
					this.state = 275;
					this.expr(0);
					}
					}
					this.state = 281;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				this.state = 282;
				this.match(QuintParser.RPAREN);
				this.state = 283;
				this.match(QuintParser.T__19);
				this.state = 284;
				this.match(QuintParser.MUL);
				this.state = 287;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__20) {
					{
					this.state = 285;
					this.match(QuintParser.T__20);
					this.state = 286;
					this.fromSource();
					}
				}

				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 289;
				this.match(QuintParser.T__18);
				this.state = 290;
				this.moduleName();
				this.state = 291;
				this.match(QuintParser.LPAREN);
				{
				this.state = 292;
				this.name();
				this.state = 293;
				this.match(QuintParser.ASGN);
				this.state = 294;
				this.expr(0);
				this.state = 302;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === QuintParser.T__7) {
					{
					{
					this.state = 295;
					this.match(QuintParser.T__7);
					this.state = 296;
					this.name();
					this.state = 297;
					this.match(QuintParser.ASGN);
					this.state = 298;
					this.expr(0);
					}
					}
					this.state = 304;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				this.state = 305;
				this.match(QuintParser.RPAREN);
				this.state = 306;
				this.match(QuintParser.T__21);
				this.state = 307;
				this.qualifiedName();
				this.state = 310;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__20) {
					{
					this.state = 308;
					this.match(QuintParser.T__20);
					this.state = 309;
					this.fromSource();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public moduleName(): ModuleNameContext {
		let _localctx: ModuleNameContext = new ModuleNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, QuintParser.RULE_moduleName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 314;
			this.qualId();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public name(): NameContext {
		let _localctx: NameContext = new NameContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, QuintParser.RULE_name);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 316;
			this.qualId();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifiedName(): QualifiedNameContext {
		let _localctx: QualifiedNameContext = new QualifiedNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, QuintParser.RULE_qualifiedName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 318;
			this.qualId();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fromSource(): FromSourceContext {
		let _localctx: FromSourceContext = new FromSourceContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, QuintParser.RULE_fromSource);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 320;
			this.match(QuintParser.STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public type(): TypeContext;
	public type(_p: number): TypeContext;
	// @RuleVersion(0)
	public type(_p?: number): TypeContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: TypeContext = new TypeContext(this._ctx, _parentState);
		let _prevctx: TypeContext = _localctx;
		let _startState: number = 32;
		this.enterRecursionRule(_localctx, 32, QuintParser.RULE_type, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 383;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				{
				_localctx = new TypeOperContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 323;
				this.match(QuintParser.LPAREN);
				this.state = 332;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << QuintParser.T__1) | (1 << QuintParser.T__10) | (1 << QuintParser.T__27) | (1 << QuintParser.T__28) | (1 << QuintParser.T__29))) !== 0) || ((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & ((1 << (QuintParser.SET - 47)) | (1 << (QuintParser.LIST - 47)) | (1 << (QuintParser.LPAREN - 47)) | (1 << (QuintParser.IDENTIFIER - 47)))) !== 0)) {
					{
					this.state = 324;
					this.type(0);
					this.state = 329;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 30, this._ctx);
					while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
						if (_alt === 1) {
							{
							{
							this.state = 325;
							this.match(QuintParser.T__7);
							this.state = 326;
							this.type(0);
							}
							}
						}
						this.state = 331;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 30, this._ctx);
					}
					}
				}

				this.state = 335;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__7) {
					{
					this.state = 334;
					this.match(QuintParser.T__7);
					}
				}

				this.state = 337;
				this.match(QuintParser.RPAREN);
				this.state = 338;
				this.match(QuintParser.T__24);
				this.state = 339;
				this.type(11);
				}
				break;

			case 2:
				{
				_localctx = new TypeSetContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 340;
				this.match(QuintParser.SET);
				this.state = 341;
				this.match(QuintParser.T__25);
				this.state = 342;
				this.type(0);
				this.state = 343;
				this.match(QuintParser.T__26);
				}
				break;

			case 3:
				{
				_localctx = new TypeListContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 345;
				this.match(QuintParser.LIST);
				this.state = 346;
				this.match(QuintParser.T__25);
				this.state = 347;
				this.type(0);
				this.state = 348;
				this.match(QuintParser.T__26);
				}
				break;

			case 4:
				{
				_localctx = new TypeTupleContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 350;
				this.match(QuintParser.LPAREN);
				this.state = 351;
				this.type(0);
				this.state = 352;
				this.match(QuintParser.T__7);
				this.state = 353;
				this.type(0);
				this.state = 358;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 33, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 354;
						this.match(QuintParser.T__7);
						this.state = 355;
						this.type(0);
						}
						}
					}
					this.state = 360;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 33, this._ctx);
				}
				this.state = 362;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__7) {
					{
					this.state = 361;
					this.match(QuintParser.T__7);
					}
				}

				this.state = 364;
				this.match(QuintParser.RPAREN);
				}
				break;

			case 5:
				{
				_localctx = new TypeRecContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 366;
				this.match(QuintParser.T__1);
				this.state = 367;
				this.row();
				this.state = 368;
				this.match(QuintParser.T__2);
				}
				break;

			case 6:
				{
				_localctx = new TypeUnionRecContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 371;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 370;
						this.typeUnionRecOne();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 373;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 35, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;

			case 7:
				{
				_localctx = new TypeIntContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 375;
				this.match(QuintParser.T__27);
				}
				break;

			case 8:
				{
				_localctx = new TypeStrContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 376;
				this.match(QuintParser.T__28);
				}
				break;

			case 9:
				{
				_localctx = new TypeBoolContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 377;
				this.match(QuintParser.T__29);
				}
				break;

			case 10:
				{
				_localctx = new TypeConstOrVarContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 378;
				this.qualId();
				}
				break;

			case 11:
				{
				_localctx = new TypeParenContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 379;
				this.match(QuintParser.LPAREN);
				this.state = 380;
				this.type(0);
				this.state = 381;
				this.match(QuintParser.RPAREN);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 393;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 38, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 391;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
					case 1:
						{
						_localctx = new TypeFunContext(new TypeContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_type);
						this.state = 385;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 386;
						this.match(QuintParser.T__23);
						this.state = 387;
						this.type(13);
						}
						break;

					case 2:
						{
						_localctx = new TypeOperContext(new TypeContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_type);
						this.state = 388;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 389;
						this.match(QuintParser.T__24);
						this.state = 390;
						this.type(12);
						}
						break;
					}
					}
				}
				this.state = 395;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 38, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeUnionRecOne(): TypeUnionRecOneContext {
		let _localctx: TypeUnionRecOneContext = new TypeUnionRecOneContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, QuintParser.RULE_typeUnionRecOne);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 396;
			this.match(QuintParser.T__10);
			this.state = 397;
			this.match(QuintParser.T__1);
			this.state = 398;
			this.qualId();
			this.state = 399;
			this.match(QuintParser.T__4);
			this.state = 400;
			this.match(QuintParser.STRING);
			this.state = 403;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				{
				this.state = 401;
				this.match(QuintParser.T__7);
				this.state = 402;
				this.row();
				}
				break;
			}
			this.state = 406;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === QuintParser.T__7) {
				{
				this.state = 405;
				this.match(QuintParser.T__7);
				}
			}

			this.state = 408;
			this.match(QuintParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public row(): RowContext {
		let _localctx: RowContext = new RowContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, QuintParser.RULE_row);
		let _la: number;
		try {
			let _alt: number;
			this.state = 433;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QuintParser.T__2:
			case QuintParser.T__7:
			case QuintParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 417;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 410;
						this.rowLabel();
						this.state = 411;
						this.match(QuintParser.T__4);
						this.state = 412;
						this.type(0);
						this.state = 413;
						this.match(QuintParser.T__7);
						}
						}
					}
					this.state = 419;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx);
				}
				this.state = 429;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.IDENTIFIER) {
					{
					{
					this.state = 420;
					this.rowLabel();
					this.state = 421;
					this.match(QuintParser.T__4);
					this.state = 422;
					this.type(0);
					}
					this.state = 427;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 42, this._ctx) ) {
					case 1:
						{
						this.state = 424;
						this.match(QuintParser.T__7);
						}
						break;

					case 2:
						{
						this.state = 425;
						this.match(QuintParser.T__10);
						{
						this.state = 426;
						_localctx._rowVar = this.match(QuintParser.IDENTIFIER);
						}
						}
						break;
					}
					}
				}

				}
				break;
			case QuintParser.T__10:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 431;
				this.match(QuintParser.T__10);
				{
				this.state = 432;
				_localctx._rowVar = this.match(QuintParser.IDENTIFIER);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rowLabel(): RowLabelContext {
		let _localctx: RowLabelContext = new RowLabelContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, QuintParser.RULE_rowLabel);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 435;
			this.simpleId("record");
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExprContext = new ExprContext(this._ctx, _parentState);
		let _prevctx: ExprContext = _localctx;
		let _startState: number = 40;
		this.enterRecursionRule(_localctx, 40, QuintParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 587;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 62, this._ctx) ) {
			case 1:
				{
				_localctx = new LambdaConsContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 438;
				this.lambda();
				}
				break;

			case 2:
				{
				_localctx = new OperAppContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 439;
				this.normalCallName();
				this.state = 440;
				this.match(QuintParser.LPAREN);
				this.state = 442;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 2)) & ~0x1F) === 0 && ((1 << (_la - 2)) & ((1 << (QuintParser.T__1 - 2)) | (1 << (QuintParser.T__11 - 2)) | (1 << (QuintParser.T__12 - 2)) | (1 << (QuintParser.T__13 - 2)) | (1 << (QuintParser.T__14 - 2)) | (1 << (QuintParser.T__15 - 2)) | (1 << (QuintParser.T__16 - 2)) | (1 << (QuintParser.T__17 - 2)) | (1 << (QuintParser.T__25 - 2)) | (1 << (QuintParser.T__32 - 2)))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (QuintParser.T__33 - 34)) | (1 << (QuintParser.T__34 - 34)) | (1 << (QuintParser.T__36 - 34)) | (1 << (QuintParser.STRING - 34)) | (1 << (QuintParser.BOOL - 34)) | (1 << (QuintParser.INT - 34)) | (1 << (QuintParser.AND - 34)) | (1 << (QuintParser.OR - 34)) | (1 << (QuintParser.IFF - 34)) | (1 << (QuintParser.IMPLIES - 34)) | (1 << (QuintParser.SET - 34)) | (1 << (QuintParser.LIST - 34)) | (1 << (QuintParser.MAP - 34)) | (1 << (QuintParser.MATCH - 34)) | (1 << (QuintParser.MINUS - 34)) | (1 << (QuintParser.LPAREN - 34)) | (1 << (QuintParser.IDENTIFIER - 34)))) !== 0)) {
					{
					this.state = 441;
					this.argList();
					}
				}

				this.state = 444;
				this.match(QuintParser.RPAREN);
				}
				break;

			case 3:
				{
				_localctx = new UminusContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 446;
				this.match(QuintParser.MINUS);
				this.state = 447;
				this.expr(25);
				}
				break;

			case 4:
				{
				_localctx = new AsgnContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 448;
				this.qualId();
				this.state = 449;
				this.match(QuintParser.T__31);
				this.state = 450;
				this.match(QuintParser.ASGN);
				this.state = 451;
				this.expr(21);
				}
				break;

			case 5:
				{
				_localctx = new AndExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 453;
				this.match(QuintParser.AND);
				this.state = 454;
				this.match(QuintParser.T__1);
				this.state = 455;
				this.expr(0);
				this.state = 460;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 46, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 456;
						this.match(QuintParser.T__7);
						this.state = 457;
						this.expr(0);
						}
						}
					}
					this.state = 462;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 46, this._ctx);
				}
				this.state = 464;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__7) {
					{
					this.state = 463;
					this.match(QuintParser.T__7);
					}
				}

				this.state = 466;
				this.match(QuintParser.T__2);
				}
				break;

			case 6:
				{
				_localctx = new OrExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 468;
				this.match(QuintParser.OR);
				this.state = 469;
				this.match(QuintParser.T__1);
				this.state = 470;
				this.expr(0);
				this.state = 475;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 48, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 471;
						this.match(QuintParser.T__7);
						this.state = 472;
						this.expr(0);
						}
						}
					}
					this.state = 477;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 48, this._ctx);
				}
				this.state = 479;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__7) {
					{
					this.state = 478;
					this.match(QuintParser.T__7);
					}
				}

				this.state = 481;
				this.match(QuintParser.T__2);
				}
				break;

			case 7:
				{
				_localctx = new MatchContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 483;
				this.matchSumExpr();
				}
				break;

			case 8:
				{
				_localctx = new ActionAllContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 484;
				this.match(QuintParser.T__32);
				this.state = 485;
				this.match(QuintParser.T__1);
				this.state = 486;
				this.expr(0);
				this.state = 491;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 50, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 487;
						this.match(QuintParser.T__7);
						this.state = 488;
						this.expr(0);
						}
						}
					}
					this.state = 493;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 50, this._ctx);
				}
				this.state = 495;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__7) {
					{
					this.state = 494;
					this.match(QuintParser.T__7);
					}
				}

				this.state = 497;
				this.match(QuintParser.T__2);
				}
				break;

			case 9:
				{
				_localctx = new ActionAnyContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 499;
				this.match(QuintParser.T__33);
				this.state = 500;
				this.match(QuintParser.T__1);
				this.state = 501;
				this.expr(0);
				this.state = 506;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 52, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 502;
						this.match(QuintParser.T__7);
						this.state = 503;
						this.expr(0);
						}
						}
					}
					this.state = 508;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 52, this._ctx);
				}
				this.state = 510;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__7) {
					{
					this.state = 509;
					this.match(QuintParser.T__7);
					}
				}

				this.state = 512;
				this.match(QuintParser.T__2);
				}
				break;

			case 10:
				{
				_localctx = new LiteralOrIdContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 518;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case QuintParser.IDENTIFIER:
					{
					this.state = 514;
					this.qualId();
					}
					break;
				case QuintParser.INT:
					{
					this.state = 515;
					this.match(QuintParser.INT);
					}
					break;
				case QuintParser.BOOL:
					{
					this.state = 516;
					this.match(QuintParser.BOOL);
					}
					break;
				case QuintParser.STRING:
					{
					this.state = 517;
					this.match(QuintParser.STRING);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;

			case 11:
				{
				_localctx = new TupleContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 520;
				this.match(QuintParser.LPAREN);
				this.state = 521;
				this.expr(0);
				this.state = 522;
				this.match(QuintParser.T__7);
				this.state = 523;
				this.expr(0);
				this.state = 528;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 55, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 524;
						this.match(QuintParser.T__7);
						this.state = 525;
						this.expr(0);
						}
						}
					}
					this.state = 530;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 55, this._ctx);
				}
				this.state = 532;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__7) {
					{
					this.state = 531;
					this.match(QuintParser.T__7);
					}
				}

				this.state = 534;
				this.match(QuintParser.RPAREN);
				}
				break;

			case 12:
				{
				_localctx = new RecordContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 536;
				this.match(QuintParser.T__1);
				this.state = 537;
				this.recElem();
				this.state = 542;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 57, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 538;
						this.match(QuintParser.T__7);
						this.state = 539;
						this.recElem();
						}
						}
					}
					this.state = 544;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 57, this._ctx);
				}
				this.state = 546;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__7) {
					{
					this.state = 545;
					this.match(QuintParser.T__7);
					}
				}

				this.state = 548;
				this.match(QuintParser.T__2);
				}
				break;

			case 13:
				{
				_localctx = new ListContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 550;
				this.match(QuintParser.T__25);
				this.state = 559;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 2)) & ~0x1F) === 0 && ((1 << (_la - 2)) & ((1 << (QuintParser.T__1 - 2)) | (1 << (QuintParser.T__11 - 2)) | (1 << (QuintParser.T__12 - 2)) | (1 << (QuintParser.T__13 - 2)) | (1 << (QuintParser.T__14 - 2)) | (1 << (QuintParser.T__15 - 2)) | (1 << (QuintParser.T__16 - 2)) | (1 << (QuintParser.T__17 - 2)) | (1 << (QuintParser.T__25 - 2)) | (1 << (QuintParser.T__32 - 2)))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (QuintParser.T__33 - 34)) | (1 << (QuintParser.T__34 - 34)) | (1 << (QuintParser.T__36 - 34)) | (1 << (QuintParser.STRING - 34)) | (1 << (QuintParser.BOOL - 34)) | (1 << (QuintParser.INT - 34)) | (1 << (QuintParser.AND - 34)) | (1 << (QuintParser.OR - 34)) | (1 << (QuintParser.IFF - 34)) | (1 << (QuintParser.IMPLIES - 34)) | (1 << (QuintParser.SET - 34)) | (1 << (QuintParser.LIST - 34)) | (1 << (QuintParser.MAP - 34)) | (1 << (QuintParser.MATCH - 34)) | (1 << (QuintParser.MINUS - 34)) | (1 << (QuintParser.LPAREN - 34)) | (1 << (QuintParser.IDENTIFIER - 34)))) !== 0)) {
					{
					this.state = 551;
					this.expr(0);
					this.state = 556;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 59, this._ctx);
					while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
						if (_alt === 1) {
							{
							{
							this.state = 552;
							this.match(QuintParser.T__7);
							this.state = 553;
							this.expr(0);
							}
							}
						}
						this.state = 558;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 59, this._ctx);
					}
					}
				}

				this.state = 562;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QuintParser.T__7) {
					{
					this.state = 561;
					this.match(QuintParser.T__7);
					}
				}

				this.state = 564;
				this.match(QuintParser.T__26);
				}
				break;

			case 14:
				{
				_localctx = new IfElseContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 565;
				this.match(QuintParser.T__34);
				this.state = 566;
				this.match(QuintParser.LPAREN);
				this.state = 567;
				this.expr(0);
				this.state = 568;
				this.match(QuintParser.RPAREN);
				this.state = 569;
				this.expr(0);
				this.state = 570;
				this.match(QuintParser.T__35);
				this.state = 571;
				this.expr(5);
				}
				break;

			case 15:
				{
				_localctx = new LetInContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 573;
				this.operDef();
				this.state = 574;
				this.expr(4);
				}
				break;

			case 16:
				{
				_localctx = new NondetContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 576;
				this.nondetOperDef();
				this.state = 577;
				this.expr(3);
				}
				break;

			case 17:
				{
				_localctx = new ParenContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 579;
				this.match(QuintParser.LPAREN);
				this.state = 580;
				this.expr(0);
				this.state = 581;
				this.match(QuintParser.RPAREN);
				}
				break;

			case 18:
				{
				_localctx = new BracesContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 583;
				this.match(QuintParser.T__1);
				this.state = 584;
				this.expr(0);
				this.state = 585;
				this.match(QuintParser.T__2);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 638;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 66, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 636;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 65, this._ctx) ) {
					case 1:
						{
						_localctx = new PowContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_expr);
						this.state = 589;
						if (!(this.precpred(this._ctx, 26))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 26)");
						}
						this.state = 590;
						(_localctx as PowContext)._op = this.match(QuintParser.T__30);
						this.state = 591;
						this.expr(26);
						}
						break;

					case 2:
						{
						_localctx = new MultDivContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_expr);
						this.state = 592;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 593;
						(_localctx as MultDivContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 53)) & ~0x1F) === 0 && ((1 << (_la - 53)) & ((1 << (QuintParser.MUL - 53)) | (1 << (QuintParser.DIV - 53)) | (1 << (QuintParser.MOD - 53)))) !== 0))) {
							(_localctx as MultDivContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 594;
						this.expr(25);
						}
						break;

					case 3:
						{
						_localctx = new PlusMinusContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_expr);
						this.state = 595;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 596;
						(_localctx as PlusMinusContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === QuintParser.PLUS || _la === QuintParser.MINUS)) {
							(_localctx as PlusMinusContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 597;
						this.expr(24);
						}
						break;

					case 4:
						{
						_localctx = new RelationsContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_expr);
						this.state = 598;
						if (!(this.precpred(this._ctx, 22))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 22)");
						}
						this.state = 599;
						(_localctx as RelationsContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & ((1 << (QuintParser.GT - 56)) | (1 << (QuintParser.LT - 56)) | (1 << (QuintParser.GE - 56)) | (1 << (QuintParser.LE - 56)) | (1 << (QuintParser.NE - 56)) | (1 << (QuintParser.EQ - 56)))) !== 0))) {
							(_localctx as RelationsContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 600;
						this.expr(23);
						}
						break;

					case 5:
						{
						_localctx = new ErrorEqContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_expr);
						this.state = 601;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 602;
						this.match(QuintParser.ASGN);
						this.state = 603;
						this.expr(21);

						                            const m = "[QNT006] unexpected '=', did you mean '=='?"
						                            this.notifyErrorListeners(m)
						                          
						}
						break;

					case 6:
						{
						_localctx = new AndContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_expr);
						this.state = 606;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 607;
						this.match(QuintParser.AND);
						this.state = 608;
						this.expr(19);
						}
						break;

					case 7:
						{
						_localctx = new OrContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_expr);
						this.state = 609;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 610;
						this.match(QuintParser.OR);
						this.state = 611;
						this.expr(17);
						}
						break;

					case 8:
						{
						_localctx = new IffContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_expr);
						this.state = 612;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 613;
						this.match(QuintParser.IFF);
						this.state = 614;
						this.expr(16);
						}
						break;

					case 9:
						{
						_localctx = new ImpliesContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_expr);
						this.state = 615;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 616;
						this.match(QuintParser.IMPLIES);
						this.state = 617;
						this.expr(15);
						}
						break;

					case 10:
						{
						_localctx = new PairContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_expr);
						this.state = 618;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 619;
						this.match(QuintParser.T__23);
						this.state = 620;
						this.expr(9);
						}
						break;

					case 11:
						{
						_localctx = new DotCallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_expr);
						this.state = 621;
						if (!(this.precpred(this._ctx, 30))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 30)");
						}
						this.state = 622;
						this.match(QuintParser.T__19);
						this.state = 623;
						this.nameAfterDot();
						this.state = 629;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 64, this._ctx) ) {
						case 1:
							{
							this.state = 624;
							this.match(QuintParser.LPAREN);
							this.state = 626;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
							if (((((_la - 2)) & ~0x1F) === 0 && ((1 << (_la - 2)) & ((1 << (QuintParser.T__1 - 2)) | (1 << (QuintParser.T__11 - 2)) | (1 << (QuintParser.T__12 - 2)) | (1 << (QuintParser.T__13 - 2)) | (1 << (QuintParser.T__14 - 2)) | (1 << (QuintParser.T__15 - 2)) | (1 << (QuintParser.T__16 - 2)) | (1 << (QuintParser.T__17 - 2)) | (1 << (QuintParser.T__25 - 2)) | (1 << (QuintParser.T__32 - 2)))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (QuintParser.T__33 - 34)) | (1 << (QuintParser.T__34 - 34)) | (1 << (QuintParser.T__36 - 34)) | (1 << (QuintParser.STRING - 34)) | (1 << (QuintParser.BOOL - 34)) | (1 << (QuintParser.INT - 34)) | (1 << (QuintParser.AND - 34)) | (1 << (QuintParser.OR - 34)) | (1 << (QuintParser.IFF - 34)) | (1 << (QuintParser.IMPLIES - 34)) | (1 << (QuintParser.SET - 34)) | (1 << (QuintParser.LIST - 34)) | (1 << (QuintParser.MAP - 34)) | (1 << (QuintParser.MATCH - 34)) | (1 << (QuintParser.MINUS - 34)) | (1 << (QuintParser.LPAREN - 34)) | (1 << (QuintParser.IDENTIFIER - 34)))) !== 0)) {
								{
								this.state = 625;
								this.argList();
								}
							}

							this.state = 628;
							this.match(QuintParser.RPAREN);
							}
							break;
						}
						}
						break;

					case 12:
						{
						_localctx = new ListAppContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, QuintParser.RULE_expr);
						this.state = 631;
						if (!(this.precpred(this._ctx, 27))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 27)");
						}
						this.state = 632;
						this.match(QuintParser.T__25);
						this.state = 633;
						this.expr(0);
						this.state = 634;
						this.match(QuintParser.T__26);
						}
						break;
					}
					}
				}
				this.state = 640;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 66, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public matchSumExpr(): MatchSumExprContext {
		let _localctx: MatchSumExprContext = new MatchSumExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, QuintParser.RULE_matchSumExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 641;
			this.match(QuintParser.MATCH);
			this.state = 642;
			this.expr(0);
			this.state = 643;
			this.match(QuintParser.T__1);
			this.state = 645;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === QuintParser.T__10) {
				{
				this.state = 644;
				this.match(QuintParser.T__10);
				}
			}

			this.state = 647;
			_localctx._matchSumCase = this.matchSumCase();
			_localctx._matchCase.push(_localctx._matchSumCase);
			this.state = 652;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === QuintParser.T__10) {
				{
				{
				this.state = 648;
				this.match(QuintParser.T__10);
				this.state = 649;
				_localctx._matchSumCase = this.matchSumCase();
				_localctx._matchCase.push(_localctx._matchSumCase);
				}
				}
				this.state = 654;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 655;
			this.match(QuintParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public matchSumCase(): MatchSumCaseContext {
		let _localctx: MatchSumCaseContext = new MatchSumCaseContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, QuintParser.RULE_matchSumCase);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 659;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QuintParser.IDENTIFIER:
				{
				this.state = 657;
				_localctx._variantMatch = this.matchSumVariant();
				}
				break;
			case QuintParser.T__36:
				{
				this.state = 658;
				_localctx._wildCardMatch = this.match(QuintParser.T__36);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 661;
			this.match(QuintParser.T__24);
			this.state = 662;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public matchSumVariant(): MatchSumVariantContext {
		let _localctx: MatchSumVariantContext = new MatchSumVariantContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, QuintParser.RULE_matchSumVariant);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 664;
			_localctx._variantLabel = this.simpleId("variant label");
			}
			this.state = 671;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === QuintParser.LPAREN) {
				{
				this.state = 665;
				this.match(QuintParser.LPAREN);
				this.state = 668;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case QuintParser.IDENTIFIER:
					{
					this.state = 666;
					_localctx._variantParam = this.simpleId("match case parameter");
					}
					break;
				case QuintParser.T__36:
					{
					this.state = 667;
					this.match(QuintParser.T__36);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 670;
				this.match(QuintParser.RPAREN);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public declarationOrExpr(): DeclarationOrExprContext {
		let _localctx: DeclarationOrExprContext = new DeclarationOrExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, QuintParser.RULE_declarationOrExpr);
		try {
			this.state = 682;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 72, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 673;
				this.declaration();
				this.state = 674;
				this.match(QuintParser.EOF);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 676;
				this.expr(0);
				this.state = 677;
				this.match(QuintParser.EOF);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 679;
				this.match(QuintParser.DOCCOMMENT);
				this.state = 680;
				this.match(QuintParser.EOF);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 681;
				this.match(QuintParser.EOF);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lambda(): LambdaContext {
		let _localctx: LambdaContext = new LambdaContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, QuintParser.RULE_lambda);
		try {
			this.state = 686;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 73, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 684;
				this.lambdaUnsugared();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 685;
				this.lambdaTupleSugar();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lambdaUnsugared(): LambdaUnsugaredContext {
		let _localctx: LambdaUnsugaredContext = new LambdaUnsugaredContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, QuintParser.RULE_lambdaUnsugared);
		let _la: number;
		try {
			this.state = 705;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QuintParser.T__36:
			case QuintParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 688;
				this.parameter();
				this.state = 689;
				this.match(QuintParser.T__24);
				this.state = 690;
				this.expr(0);
				}
				break;
			case QuintParser.LPAREN:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 692;
				this.match(QuintParser.LPAREN);
				this.state = 693;
				this.parameter();
				this.state = 698;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === QuintParser.T__7) {
					{
					{
					this.state = 694;
					this.match(QuintParser.T__7);
					this.state = 695;
					this.parameter();
					}
					}
					this.state = 700;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 701;
				this.match(QuintParser.RPAREN);
				this.state = 702;
				this.match(QuintParser.T__24);
				this.state = 703;
				this.expr(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lambdaTupleSugar(): LambdaTupleSugarContext {
		let _localctx: LambdaTupleSugarContext = new LambdaTupleSugarContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, QuintParser.RULE_lambdaTupleSugar);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 707;
			this.match(QuintParser.LPAREN);
			this.state = 708;
			this.match(QuintParser.LPAREN);
			this.state = 709;
			this.parameter();
			this.state = 712;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 710;
				this.match(QuintParser.T__7);
				this.state = 711;
				this.parameter();
				}
				}
				this.state = 714;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === QuintParser.T__7);
			this.state = 716;
			this.match(QuintParser.RPAREN);
			this.state = 717;
			this.match(QuintParser.RPAREN);
			this.state = 718;
			this.match(QuintParser.T__24);
			this.state = 719;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identOrHole(): IdentOrHoleContext {
		let _localctx: IdentOrHoleContext = new IdentOrHoleContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, QuintParser.RULE_identOrHole);
		try {
			this.state = 723;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QuintParser.T__36:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 721;
				this.match(QuintParser.T__36);
				}
				break;
			case QuintParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 722;
				this.qualId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameter(): ParameterContext {
		let _localctx: ParameterContext = new ParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, QuintParser.RULE_parameter);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 725;
			this.identOrHole();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identOrStar(): IdentOrStarContext {
		let _localctx: IdentOrStarContext = new IdentOrStarContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, QuintParser.RULE_identOrStar);
		try {
			this.state = 729;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QuintParser.MUL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 727;
				this.match(QuintParser.MUL);
				}
				break;
			case QuintParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 728;
				this.qualId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public argList(): ArgListContext {
		let _localctx: ArgListContext = new ArgListContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, QuintParser.RULE_argList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 731;
			this.expr(0);
			this.state = 736;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === QuintParser.T__7) {
				{
				{
				this.state = 732;
				this.match(QuintParser.T__7);
				this.state = 733;
				this.expr(0);
				}
				}
				this.state = 738;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public recElem(): RecElemContext {
		let _localctx: RecElemContext = new RecElemContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, QuintParser.RULE_recElem);
		try {
			this.state = 745;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QuintParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 739;
				this.simpleId("record");
				this.state = 740;
				this.match(QuintParser.T__4);
				this.state = 741;
				this.expr(0);
				}
				break;
			case QuintParser.T__37:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 743;
				this.match(QuintParser.T__37);
				this.state = 744;
				this.expr(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public normalCallName(): NormalCallNameContext {
		let _localctx: NormalCallNameContext = new NormalCallNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, QuintParser.RULE_normalCallName);
		let _la: number;
		try {
			this.state = 749;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QuintParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 747;
				this.qualId();
				}
				break;
			case QuintParser.AND:
			case QuintParser.OR:
			case QuintParser.IFF:
			case QuintParser.IMPLIES:
			case QuintParser.SET:
			case QuintParser.LIST:
			case QuintParser.MAP:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 748;
				_localctx._op = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (QuintParser.AND - 43)) | (1 << (QuintParser.OR - 43)) | (1 << (QuintParser.IFF - 43)) | (1 << (QuintParser.IMPLIES - 43)) | (1 << (QuintParser.SET - 43)) | (1 << (QuintParser.LIST - 43)) | (1 << (QuintParser.MAP - 43)))) !== 0))) {
					_localctx._op = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nameAfterDot(): NameAfterDotContext {
		let _localctx: NameAfterDotContext = new NameAfterDotContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, QuintParser.RULE_nameAfterDot);
		let _la: number;
		try {
			this.state = 753;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QuintParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 751;
				this.qualId();
				}
				break;
			case QuintParser.AND:
			case QuintParser.OR:
			case QuintParser.IFF:
			case QuintParser.IMPLIES:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 752;
				_localctx._op = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (QuintParser.AND - 43)) | (1 << (QuintParser.OR - 43)) | (1 << (QuintParser.IFF - 43)) | (1 << (QuintParser.IMPLIES - 43)))) !== 0))) {
					_localctx._op = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operator(): OperatorContext {
		let _localctx: OperatorContext = new OperatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, QuintParser.RULE_operator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 755;
			_la = this._input.LA(1);
			if (!(((((_la - 31)) & ~0x1F) === 0 && ((1 << (_la - 31)) & ((1 << (QuintParser.T__30 - 31)) | (1 << (QuintParser.AND - 31)) | (1 << (QuintParser.OR - 31)) | (1 << (QuintParser.IFF - 31)) | (1 << (QuintParser.IMPLIES - 31)) | (1 << (QuintParser.PLUS - 31)) | (1 << (QuintParser.MINUS - 31)) | (1 << (QuintParser.MUL - 31)) | (1 << (QuintParser.DIV - 31)) | (1 << (QuintParser.MOD - 31)) | (1 << (QuintParser.GT - 31)) | (1 << (QuintParser.LT - 31)) | (1 << (QuintParser.GE - 31)) | (1 << (QuintParser.LE - 31)) | (1 << (QuintParser.NE - 31)) | (1 << (QuintParser.EQ - 31)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, QuintParser.RULE_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 757;
			_la = this._input.LA(1);
			if (!(((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & ((1 << (QuintParser.STRING - 40)) | (1 << (QuintParser.BOOL - 40)) | (1 << (QuintParser.INT - 40)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualId(): QualIdContext {
		let _localctx: QualIdContext = new QualIdContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, QuintParser.RULE_qualId);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 759;
			this.match(QuintParser.IDENTIFIER);
			this.state = 764;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 83, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 760;
					this.match(QuintParser.T__38);
					this.state = 761;
					this.match(QuintParser.IDENTIFIER);
					}
					}
				}
				this.state = 766;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 83, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simpleId(context: string): SimpleIdContext {
		let _localctx: SimpleIdContext = new SimpleIdContext(this._ctx, this.state, context);
		this.enterRule(_localctx, 76, QuintParser.RULE_simpleId);
		try {
			this.state = 771;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 84, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 767;
				this.match(QuintParser.IDENTIFIER);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 768;
				_localctx._qualId = this.qualId();

				        const err = quintErrorToString(
				          { code: 'QNT008',
				            message: "Identifiers in a " + _localctx.context + " cannot be qualified with '::'. Found " + (_localctx._qualId != null ? this._input.getTextFromRange(_localctx._qualId._start, _localctx._qualId._stop) : undefined) + "."
				          },
				        )
				        this.notifyErrorListeners(err)
				      
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public empty(): EmptyContext {
		let _localctx: EmptyContext = new EmptyContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, QuintParser.RULE_empty);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 773;
			this.match(QuintParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 16:
			return this.type_sempred(_localctx as TypeContext, predIndex);

		case 20:
			return this.expr_sempred(_localctx as ExprContext, predIndex);
		}
		return true;
	}
	private type_sempred(_localctx: TypeContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 13);

		case 1:
			return this.precpred(this._ctx, 12);
		}
		return true;
	}
	private expr_sempred(_localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 2:
			return this.precpred(this._ctx, 26);

		case 3:
			return this.precpred(this._ctx, 24);

		case 4:
			return this.precpred(this._ctx, 23);

		case 5:
			return this.precpred(this._ctx, 22);

		case 6:
			return this.precpred(this._ctx, 20);

		case 7:
			return this.precpred(this._ctx, 18);

		case 8:
			return this.precpred(this._ctx, 16);

		case 9:
			return this.precpred(this._ctx, 15);

		case 10:
			return this.precpred(this._ctx, 14);

		case 11:
			return this.precpred(this._ctx, 8);

		case 12:
			return this.precpred(this._ctx, 30);

		case 13:
			return this.precpred(this._ctx, 27);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03G\u030A\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x03\x02\x06\x02" +
		"T\n\x02\r\x02\x0E\x02U\x03\x02\x03\x02\x03\x03\x07\x03[\n\x03\f\x03\x0E" +
		"\x03^\v\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03d\n\x03\f\x03\x0E\x03" +
		"g\v\x03\x03\x03\x03\x03\x03\x04\x07\x04l\n\x04\f\x04\x0E\x04o\v\x04\x03" +
		"\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x03\x05\x05\x05\x87\n\x05\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x07\x06\x8F\n\x06\f\x06\x0E\x06\x92\v\x06\x05" +
		"\x06\x94\n\x06\x03\x06\x03\x06\x03\x06\x05\x06\x99\n\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x07\x06\xA6\n\x06\f\x06\x0E\x06\xA9\v\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x05\x06\xAF\n\x06\x03\x06\x03\x06\x05\x06\xB3\n\x06\x03\x06\x05\x06" +
		"\xB6\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x03\x07\x05\x07\xC3\n\x07\x03\x07\x03\x07\x03\x07" +
		"\x07\x07\xC8\n\x07\f\x07\x0E\x07\xCB\v\x07\x05\x07\xCD\n\x07\x03\b\x03" +
		"\b\x03\b\x03\b\x03\b\x05\b\xD4\n\b\x03\t\x03\t\x03\t\x03\t\x05\t\xDA\n" +
		"\t\x03\t\x03\t\x03\t\x05\t\xDF\n\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n" +
		"\x03\n\x03\n\x03\n\x05\n\xEA\n\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x05" +
		"\v\xF2\n\v\x03\v\x03\v\x03\v\x03\v\x05\v\xF8\n\v\x03\v\x03\v\x05\v\xFC" +
		"\n\v\x05\v\xFE\n\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03" +
		"\f\x05\f\u0109\n\f\x05\f\u010B\n\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r" +
		"\x03\r\x03\r\x03\r\x03\r\x03\r\x07\r\u0118\n\r\f\r\x0E\r\u011B\v\r\x03" +
		"\r\x03\r\x03\r\x03\r\x03\r\x05\r\u0122\n\r\x03\r\x03\r\x03\r\x03\r\x03" +
		"\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x07\r\u012F\n\r\f\r\x0E\r\u0132" +
		"\v\r\x03\r\x03\r\x03\r\x03\r\x03\r\x05\r\u0139\n\r\x05\r\u013B\n\r\x03" +
		"\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03" +
		"\x12\x03\x12\x03\x12\x03\x12\x07\x12\u014A\n\x12\f\x12\x0E\x12\u014D\v" +
		"\x12\x05\x12\u014F\n\x12\x03\x12\x05\x12\u0152\n\x12\x03\x12\x03\x12\x03" +
		"\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03" +
		"\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x07\x12\u0167" +
		"\n\x12\f\x12\x0E\x12\u016A\v\x12\x03\x12\x05\x12\u016D\n\x12\x03\x12\x03" +
		"\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x06\x12\u0176\n\x12\r\x12" +
		"\x0E\x12\u0177\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12" +
		"\x03\x12\x05\x12\u0182\n\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03" +
		"\x12\x07\x12\u018A\n\x12\f\x12\x0E\x12\u018D\v\x12\x03\x13\x03\x13\x03" +
		"\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13\u0196\n\x13\x03\x13\x05\x13" +
		"\u0199\n\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x07" +
		"\x14\u01A2\n\x14\f\x14\x0E\x14\u01A5\v\x14\x03\x14\x03\x14\x03\x14\x03" +
		"\x14\x03\x14\x03\x14\x03\x14\x05\x14\u01AE\n\x14\x05\x14\u01B0\n\x14\x03" +
		"\x14\x03\x14\x05\x14\u01B4\n\x14\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16" +
		"\x03\x16\x03\x16\x05\x16\u01BD\n\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x07\x16\u01CD\n\x16\f\x16\x0E\x16\u01D0\v\x16\x03\x16\x05\x16\u01D3" +
		"\n\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x07\x16" +
		"\u01DC\n\x16\f\x16\x0E\x16\u01DF\v\x16\x03\x16\x05\x16\u01E2\n\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x07\x16\u01EC" +
		"\n\x16\f\x16\x0E\x16\u01EF\v\x16\x03\x16\x05\x16\u01F2\n\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x07\x16\u01FB\n\x16\f\x16" +
		"\x0E\x16\u01FE\v\x16\x03\x16\x05\x16\u0201\n\x16\x03\x16\x03\x16\x03\x16" +
		"\x03\x16\x03\x16\x03\x16\x05\x16\u0209\n\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x07\x16\u0211\n\x16\f\x16\x0E\x16\u0214\v\x16\x03" +
		"\x16\x05\x16\u0217\n\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16" +
		"\x07\x16\u021F\n\x16\f\x16\x0E\x16\u0222\v\x16\x03\x16\x05\x16\u0225\n" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x07\x16\u022D\n\x16" +
		"\f\x16\x0E\x16\u0230\v\x16\x05\x16\u0232\n\x16\x03\x16\x05\x16\u0235\n" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x05\x16\u024E\n\x16\x03\x16" +
		"\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16" +
		"\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16" +
		"\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16" +
		"\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16" +
		"\x05\x16\u0275\n\x16\x03\x16\x05\x16\u0278\n\x16\x03\x16\x03\x16\x03\x16" +
		"\x03\x16\x03\x16\x07\x16\u027F\n\x16\f\x16\x0E\x16\u0282\v\x16\x03\x17" +
		"\x03\x17\x03\x17\x03\x17\x05\x17\u0288\n\x17\x03\x17\x03\x17\x03\x17\x07" +
		"\x17\u028D\n\x17\f\x17\x0E\x17\u0290\v\x17\x03\x17\x03\x17\x03\x18\x03" +
		"\x18\x05\x18\u0296\n\x18\x03\x18\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19" +
		"\x03\x19\x05\x19\u029F\n\x19\x03\x19\x05\x19\u02A2\n\x19\x03\x1A\x03\x1A" +
		"\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u02AD" +
		"\n\x1A\x03\x1B\x03\x1B\x05\x1B\u02B1\n\x1B\x03\x1C\x03\x1C\x03\x1C\x03" +
		"\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x07\x1C\u02BB\n\x1C\f\x1C\x0E\x1C" +
		"\u02BE\v\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x05\x1C\u02C4\n\x1C\x03\x1D" +
		"\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x06\x1D\u02CB\n\x1D\r\x1D\x0E\x1D\u02CC" +
		"\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x05\x1E\u02D6" +
		"\n\x1E\x03\x1F\x03\x1F\x03 \x03 \x05 \u02DC\n \x03!\x03!\x03!\x07!\u02E1" +
		"\n!\f!\x0E!\u02E4\v!\x03\"\x03\"\x03\"\x03\"\x03\"\x03\"\x05\"\u02EC\n" +
		"\"\x03#\x03#\x05#\u02F0\n#\x03$\x03$\x05$\u02F4\n$\x03%\x03%\x03&\x03" +
		"&\x03\'\x03\'\x03\'\x07\'\u02FD\n\'\f\'\x0E\'\u0300\v\'\x03(\x03(\x03" +
		"(\x03(\x05(\u0306\n(\x03)\x03)\x03)\x02\x02\x04\"**\x02\x02\x04\x02\x06" +
		"\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02" +
		"\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x02" +
		"2\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02" +
		"N\x02P\x02\x02\t\x03\x0279\x03\x0256\x03\x02:?\x03\x02-3\x03\x02-0\x05" +
		"\x02!!-05?\x03\x02*,\x02\u036C\x02S\x03\x02\x02\x02\x04\\\x03\x02\x02" +
		"\x02\x06m\x03\x02\x02\x02\b\x86\x03\x02\x02\x02\n\x88\x03\x02\x02\x02" +
		"\f\xCC\x03\x02\x02\x02\x0E\xCE\x03\x02\x02\x02\x10\xD5\x03\x02\x02\x02" +
		"\x12\xE9\x03\x02\x02\x02\x14\xFD\x03\x02\x02\x02\x16\u010A\x03\x02\x02" +
		"\x02\x18\u013A\x03\x02\x02\x02\x1A\u013C\x03\x02\x02\x02\x1C\u013E\x03" +
		"\x02\x02\x02\x1E\u0140\x03\x02\x02\x02 \u0142\x03\x02\x02\x02\"\u0181" +
		"\x03\x02\x02\x02$\u018E\x03\x02\x02\x02&\u01B3\x03\x02\x02\x02(\u01B5" +
		"\x03\x02\x02\x02*\u024D\x03\x02\x02\x02,\u0283\x03\x02\x02\x02.\u0295" +
		"\x03\x02\x02\x020\u029A\x03\x02\x02\x022\u02AC\x03\x02\x02\x024\u02B0" +
		"\x03\x02\x02\x026\u02C3\x03\x02\x02\x028\u02C5\x03\x02\x02\x02:\u02D5" +
		"\x03\x02\x02\x02<\u02D7\x03\x02\x02\x02>\u02DB\x03\x02\x02\x02@\u02DD" +
		"\x03\x02\x02\x02B\u02EB\x03\x02\x02\x02D\u02EF\x03\x02\x02\x02F\u02F3" +
		"\x03\x02\x02\x02H\u02F5\x03\x02\x02\x02J\u02F7\x03\x02\x02\x02L\u02F9" +
		"\x03\x02\x02\x02N\u0305\x03\x02\x02\x02P\u0307\x03\x02\x02\x02RT\x05\x04" +
		"\x03\x02SR\x03\x02\x02\x02TU\x03\x02\x02\x02US\x03\x02\x02\x02UV\x03\x02" +
		"\x02\x02VW\x03\x02\x02\x02WX\x07\x02\x02\x03X\x03\x03\x02\x02\x02Y[\x07" +
		"D\x02\x02ZY\x03\x02\x02\x02[^\x03\x02\x02\x02\\Z\x03\x02\x02\x02\\]\x03" +
		"\x02\x02\x02]_\x03\x02\x02\x02^\\\x03\x02\x02\x02_`\x07\x03\x02\x02`a" +
		"\x05L\'\x02ae\x07\x04\x02\x02bd\x05\x06\x04\x02cb\x03\x02\x02\x02dg\x03" +
		"\x02\x02\x02ec\x03\x02\x02\x02ef\x03\x02\x02\x02fh\x03\x02\x02\x02ge\x03" +
		"\x02\x02\x02hi\x07\x05\x02\x02i\x05\x03\x02\x02\x02jl\x07D\x02\x02kj\x03" +
		"\x02\x02\x02lo\x03\x02\x02\x02mk\x03\x02\x02\x02mn\x03\x02\x02\x02np\x03" +
		"\x02\x02\x02om\x03\x02\x02\x02pq\x05\b\x05\x02q\x07\x03\x02\x02\x02rs" +
		"\x07\x06\x02\x02st\x05L\'\x02tu\x07\x07\x02\x02uv\x05\"\x12\x02v\x87\x03" +
		"\x02\x02\x02wx\x07\b\x02\x02xy\x05L\'\x02yz\x07\x07\x02\x02z{\x05\"\x12" +
		"\x02{\x87\x03\x02\x02\x02|}\x07\t\x02\x02}~\x05:\x1E\x02~\x7F\x07@\x02" +
		"\x02\x7F\x80\x05*\x16\x02\x80\x87\x03\x02\x02\x02\x81\x87\x05\x18\r\x02" +
		"\x82\x87\x05\n\x06\x02\x83\x87\x05\f\x07\x02\x84\x87\x05\x14\v\x02\x85" +
		"\x87\x05\x16\f\x02\x86r\x03\x02\x02\x02\x86w\x03\x02\x02\x02\x86|\x03" +
		"\x02\x02\x02\x86\x81\x03\x02\x02\x02\x86\x82\x03\x02\x02\x02\x86\x83\x03" +
		"\x02\x02\x02\x86\x84\x03\x02\x02\x02\x86\x85\x03\x02\x02\x02\x87\t\x03" +
		"\x02\x02\x02\x88\x89\x05\x12\n\x02\x89\xAE\x05D#\x02\x8A\x93\x07A\x02" +
		"\x02\x8B\x90\x05<\x1F\x02\x8C\x8D\x07\n\x02\x02\x8D\x8F\x05<\x1F\x02\x8E" +
		"\x8C\x03\x02\x02\x02\x8F\x92\x03\x02\x02\x02\x90\x8E\x03\x02\x02\x02\x90" +
		"\x91\x03\x02\x02\x02\x91\x94\x03\x02\x02\x02\x92\x90\x03\x02\x02\x02\x93" +
		"\x8B\x03\x02\x02\x02\x93\x94\x03\x02\x02\x02\x94\x95\x03\x02\x02\x02\x95" +
		"\x98\x07B\x02\x02\x96\x97\x07\x07\x02\x02\x97\x99\x05\"\x12\x02\x98\x96" +
		"\x03\x02\x02\x02\x98\x99\x03\x02\x02\x02\x99\xAF\x03\x02\x02\x02\x9A\x9B" +
		"\x07\x07\x02\x02\x9B\xAF\x05\"\x12\x02\x9C\x9D\x07A\x02\x02\x9D\x9E\x05" +
		"<\x1F\x02\x9E\x9F\x07\x07\x02\x02\x9F\xA7\x05\"\x12\x02\xA0\xA1\x07\n" +
		"\x02\x02\xA1\xA2\x05<\x1F\x02\xA2\xA3\x07\x07\x02\x02\xA3\xA4\x05\"\x12" +
		"\x02\xA4\xA6\x03\x02\x02\x02\xA5\xA0\x03\x02\x02\x02\xA6\xA9\x03\x02\x02" +
		"\x02\xA7\xA5\x03\x02\x02\x02\xA7\xA8\x03\x02\x02\x02\xA8\xAA\x03\x02\x02" +
		"\x02\xA9\xA7\x03\x02\x02\x02\xAA\xAB\x07B\x02\x02\xAB\xAC\x07\x07\x02" +
		"\x02\xAC\xAD\x05\"\x12\x02\xAD\xAF\x03\x02\x02\x02\xAE\x8A\x03\x02\x02" +
		"\x02\xAE\x9A\x03\x02\x02\x02\xAE\x9C\x03\x02\x02\x02\xAE\xAF\x03\x02\x02" +
		"\x02\xAF\xB2\x03\x02\x02\x02\xB0\xB1\x07@\x02\x02\xB1\xB3\x05*\x16\x02" +
		"\xB2\xB0\x03\x02\x02\x02\xB2\xB3\x03\x02\x02\x02\xB3\xB5\x03\x02\x02\x02" +
		"\xB4\xB6\x07\v\x02\x02\xB5\xB4\x03\x02\x02\x02\xB5\xB6\x03\x02\x02\x02" +
		"\xB6\v\x03\x02\x02\x02\xB7\xB8\x07\f\x02\x02\xB8\xCD\x05L\'\x02\xB9\xBA" +
		"\x07\f\x02\x02\xBA\xBB\x05L\'\x02\xBB\xBC\x07@\x02\x02\xBC\xBD\x05\"\x12" +
		"\x02\xBD\xCD\x03\x02\x02\x02\xBE\xBF\x07\f\x02\x02\xBF\xC0\x05L\'\x02" +
		"\xC0\xC2\x07@\x02\x02\xC1\xC3\x07\r\x02\x02\xC2\xC1\x03\x02\x02\x02\xC2" +
		"\xC3\x03\x02\x02\x02\xC3\xC4\x03\x02\x02\x02\xC4\xC9\x05\x0E\b\x02\xC5" +
		"\xC6\x07\r\x02\x02\xC6\xC8\x05\x0E\b\x02\xC7\xC5\x03\x02\x02\x02\xC8\xCB" +
		"\x03\x02\x02\x02\xC9\xC7\x03\x02\x02\x02\xC9\xCA\x03\x02\x02\x02\xCA\xCD" +
		"\x03\x02\x02\x02\xCB\xC9\x03\x02\x02\x02\xCC\xB7\x03\x02\x02\x02\xCC\xB9" +
		"\x03\x02\x02\x02\xCC\xBE\x03\x02\x02\x02\xCD\r\x03\x02\x02\x02\xCE\xD3" +
		"\x05N(\x02\xCF\xD0\x07A\x02\x02\xD0\xD1\x05\"\x12\x02\xD1\xD2\x07B\x02" +
		"\x02\xD2\xD4\x03\x02\x02\x02\xD3\xCF\x03\x02\x02\x02\xD3\xD4\x03\x02\x02" +
		"\x02\xD4\x0F\x03\x02\x02\x02\xD5\xD6\x07\x0E\x02\x02\xD6\xD9\x05L\'\x02" +
		"\xD7\xD8\x07\x07\x02\x02\xD8\xDA\x05\"\x12\x02\xD9\xD7\x03\x02\x02\x02" +
		"\xD9\xDA\x03\x02\x02\x02\xDA\xDB\x03\x02\x02\x02\xDB\xDC\x07@\x02\x02" +
		"\xDC\xDE\x05*\x16\x02\xDD\xDF\x07\v\x02\x02\xDE\xDD\x03\x02\x02\x02\xDE" +
		"\xDF\x03\x02\x02\x02\xDF\x11\x03\x02\x02\x02\xE0\xEA\x07\x0F\x02\x02\xE1" +
		"\xEA\x07\x10\x02\x02\xE2\xE3\x07\x11\x02\x02\xE3\xEA\x07\x0F\x02\x02\xE4" +
		"\xE5\x07\x11\x02\x02\xE5\xEA\x07\x10\x02\x02\xE6\xEA\x07\x12\x02\x02\xE7" +
		"\xEA\x07\x13\x02\x02\xE8\xEA\x07\x14\x02\x02\xE9\xE0\x03\x02\x02\x02\xE9" +
		"\xE1\x03\x02\x02\x02\xE9\xE2\x03\x02\x02\x02\xE9\xE4\x03\x02\x02\x02\xE9" +
		"\xE6\x03\x02\x02\x02\xE9\xE7\x03\x02\x02\x02\xE9\xE8\x03\x02\x02\x02\xEA" +
		"\x13\x03\x02\x02\x02\xEB\xEC\x07\x15\x02\x02\xEC\xED\x05\x1C\x0F\x02\xED" +
		"\xEE\x07\x16\x02\x02\xEE\xF1\x05> \x02\xEF\xF0\x07\x17\x02\x02\xF0\xF2" +
		"\x05 \x11\x02\xF1\xEF\x03\x02\x02\x02\xF1\xF2\x03\x02\x02\x02\xF2\xFE" +
		"\x03\x02\x02\x02\xF3\xF4\x07\x15\x02\x02\xF4\xF7\x05\x1C\x0F\x02\xF5\xF6" +
		"\x07\x18\x02\x02\xF6\xF8\x05\x1C\x0F\x02\xF7\xF5\x03\x02\x02\x02\xF7\xF8" +
		"\x03\x02\x02\x02\xF8\xFB\x03\x02\x02\x02\xF9\xFA\x07\x17\x02\x02\xFA\xFC" +
		"\x05 \x11\x02\xFB\xF9\x03\x02\x02\x02\xFB\xFC\x03\x02\x02\x02\xFC\xFE" +
		"\x03\x02\x02\x02\xFD\xEB\x03\x02\x02\x02\xFD\xF3\x03\x02\x02\x02\xFE\x15" +
		"\x03\x02\x02\x02\xFF\u0100\x07\x19\x02\x02\u0100\u0101\x05\x1C\x0F\x02" +
		"\u0101\u0102\x07\x16\x02\x02\u0102\u0103\x05> \x02\u0103\u010B\x03\x02" +
		"\x02\x02\u0104\u0105\x07\x19\x02\x02\u0105\u0108\x05\x1C\x0F\x02\u0106" +
		"\u0107\x07\x18\x02\x02\u0107\u0109\x05\x1C\x0F\x02\u0108\u0106\x03\x02" +
		"\x02\x02\u0108\u0109\x03\x02\x02\x02\u0109\u010B\x03\x02\x02\x02\u010A" +
		"\xFF\x03\x02\x02\x02\u010A\u0104\x03\x02\x02\x02\u010B\x17\x03\x02\x02" +
		"\x02\u010C\u010D\x07\x15\x02\x02\u010D\u010E\x05\x1A\x0E\x02\u010E\u010F" +
		"\x07A\x02\x02\u010F\u0110\x05\x1C\x0F\x02\u0110\u0111\x07@\x02\x02\u0111" +
		"\u0119\x05*\x16\x02\u0112\u0113\x07\n\x02\x02\u0113\u0114\x05\x1C\x0F" +
		"\x02\u0114\u0115\x07@\x02\x02\u0115\u0116\x05*\x16\x02\u0116\u0118\x03" +
		"\x02\x02\x02\u0117\u0112\x03\x02\x02\x02\u0118\u011B\x03\x02\x02\x02\u0119" +
		"\u0117\x03\x02\x02\x02\u0119\u011A\x03\x02\x02\x02\u011A\u011C\x03\x02" +
		"\x02\x02\u011B\u0119\x03\x02\x02\x02\u011C\u011D\x07B\x02\x02\u011D\u011E" +
		"\x07\x16\x02\x02\u011E\u0121\x077\x02\x02\u011F\u0120\x07\x17\x02\x02" +
		"\u0120\u0122\x05 \x11\x02\u0121\u011F\x03\x02\x02\x02\u0121\u0122\x03" +
		"\x02\x02\x02\u0122\u013B\x03\x02\x02\x02\u0123\u0124\x07\x15\x02\x02\u0124" +
		"\u0125\x05\x1A\x0E\x02\u0125\u0126\x07A\x02\x02\u0126\u0127\x05\x1C\x0F" +
		"\x02\u0127\u0128\x07@\x02\x02\u0128\u0130\x05*\x16\x02\u0129\u012A\x07" +
		"\n\x02\x02\u012A\u012B\x05\x1C\x0F\x02\u012B\u012C\x07@\x02\x02\u012C" +
		"\u012D\x05*\x16\x02\u012D\u012F\x03\x02\x02\x02\u012E\u0129\x03\x02\x02" +
		"\x02\u012F\u0132\x03\x02\x02\x02\u0130\u012E\x03\x02\x02\x02\u0130\u0131" +
		"\x03\x02\x02\x02\u0131\u0133\x03\x02\x02\x02\u0132\u0130\x03\x02\x02\x02" +
		"\u0133\u0134\x07B\x02\x02\u0134\u0135\x07\x18\x02\x02\u0135\u0138\x05" +
		"\x1E\x10\x02\u0136\u0137\x07\x17\x02\x02\u0137\u0139\x05 \x11\x02\u0138" +
		"\u0136\x03\x02\x02\x02\u0138\u0139\x03\x02\x02\x02\u0139\u013B\x03\x02" +
		"\x02\x02\u013A\u010C\x03\x02\x02\x02\u013A\u0123\x03\x02\x02\x02\u013B" +
		"\x19\x03\x02\x02\x02\u013C\u013D\x05L\'\x02\u013D\x1B\x03\x02\x02\x02" +
		"\u013E\u013F\x05L\'\x02\u013F\x1D\x03\x02\x02\x02\u0140\u0141\x05L\'\x02" +
		"\u0141\x1F\x03\x02\x02\x02\u0142\u0143\x07*\x02\x02\u0143!\x03\x02\x02" +
		"\x02\u0144\u0145\b\x12\x01\x02\u0145\u014E\x07A\x02\x02\u0146\u014B\x05" +
		"\"\x12\x02\u0147\u0148\x07\n\x02\x02\u0148\u014A\x05\"\x12\x02\u0149\u0147" +
		"\x03\x02\x02\x02\u014A\u014D\x03\x02\x02\x02\u014B\u0149\x03\x02\x02\x02" +
		"\u014B\u014C\x03\x02\x02\x02\u014C\u014F\x03\x02\x02\x02\u014D\u014B\x03" +
		"\x02\x02\x02\u014E\u0146\x03\x02\x02\x02\u014E\u014F\x03\x02\x02\x02\u014F" +
		"\u0151\x03\x02\x02\x02\u0150\u0152\x07\n\x02\x02\u0151\u0150\x03\x02\x02" +
		"\x02\u0151\u0152\x03\x02\x02\x02\u0152\u0153\x03\x02\x02\x02\u0153\u0154" +
		"\x07B\x02\x02\u0154\u0155\x07\x1B\x02\x02\u0155\u0182\x05\"\x12\r\u0156" +
		"\u0157\x071\x02\x02\u0157\u0158\x07\x1C\x02\x02\u0158\u0159\x05\"\x12" +
		"\x02\u0159\u015A\x07\x1D\x02\x02\u015A\u0182\x03\x02\x02\x02\u015B\u015C" +
		"\x072\x02\x02\u015C\u015D\x07\x1C\x02\x02\u015D\u015E\x05\"\x12\x02\u015E" +
		"\u015F\x07\x1D\x02\x02\u015F\u0182\x03\x02\x02\x02\u0160\u0161\x07A\x02" +
		"\x02\u0161\u0162\x05\"\x12\x02\u0162\u0163\x07\n\x02\x02\u0163\u0168\x05" +
		"\"\x12\x02\u0164\u0165\x07\n\x02\x02\u0165\u0167\x05\"\x12\x02\u0166\u0164" +
		"\x03\x02\x02\x02\u0167\u016A\x03\x02\x02\x02\u0168\u0166\x03\x02\x02\x02" +
		"\u0168\u0169\x03\x02\x02\x02\u0169\u016C\x03\x02\x02\x02\u016A\u0168\x03" +
		"\x02\x02\x02\u016B\u016D\x07\n\x02\x02\u016C\u016B\x03\x02\x02\x02\u016C" +
		"\u016D\x03\x02\x02\x02\u016D\u016E\x03\x02\x02\x02\u016E\u016F\x07B\x02" +
		"\x02\u016F\u0182\x03\x02\x02\x02\u0170\u0171\x07\x04\x02\x02\u0171\u0172" +
		"\x05&\x14\x02\u0172\u0173\x07\x05\x02\x02\u0173\u0182\x03\x02\x02\x02" +
		"\u0174\u0176\x05$\x13\x02\u0175\u0174\x03\x02\x02\x02\u0176\u0177\x03" +
		"\x02\x02\x02\u0177\u0175\x03\x02\x02\x02\u0177\u0178\x03\x02\x02\x02\u0178" +
		"\u0182\x03\x02\x02\x02\u0179\u0182\x07\x1E\x02\x02\u017A\u0182\x07\x1F" +
		"\x02\x02\u017B\u0182\x07 \x02\x02\u017C\u0182\x05L\'\x02\u017D\u017E\x07" +
		"A\x02\x02\u017E\u017F\x05\"\x12\x02\u017F\u0180\x07B\x02\x02\u0180\u0182" +
		"\x03\x02\x02\x02\u0181\u0144\x03\x02\x02\x02\u0181\u0156\x03\x02\x02\x02" +
		"\u0181\u015B\x03\x02\x02\x02\u0181\u0160\x03\x02\x02\x02\u0181\u0170\x03" +
		"\x02\x02\x02\u0181\u0175\x03\x02\x02\x02\u0181\u0179\x03\x02\x02\x02\u0181" +
		"\u017A\x03\x02\x02\x02\u0181\u017B\x03\x02\x02\x02\u0181\u017C\x03\x02" +
		"\x02\x02\u0181\u017D\x03\x02\x02\x02\u0182\u018B\x03\x02\x02\x02\u0183" +
		"\u0184\f\x0F\x02\x02\u0184\u0185\x07\x1A\x02\x02\u0185\u018A\x05\"\x12" +
		"\x0F\u0186\u0187\f\x0E\x02\x02\u0187\u0188\x07\x1B\x02\x02\u0188\u018A" +
		"\x05\"\x12\x0E\u0189\u0183\x03\x02\x02\x02\u0189\u0186\x03\x02\x02\x02" +
		"\u018A\u018D\x03\x02\x02\x02\u018B\u0189\x03\x02\x02\x02\u018B\u018C\x03" +
		"\x02\x02\x02\u018C#\x03\x02\x02\x02\u018D\u018B\x03\x02\x02\x02\u018E" +
		"\u018F\x07\r\x02\x02\u018F\u0190\x07\x04\x02\x02\u0190\u0191\x05L\'\x02" +
		"\u0191\u0192\x07\x07\x02\x02\u0192\u0195\x07*\x02\x02\u0193\u0194\x07" +
		"\n\x02\x02\u0194\u0196\x05&\x14\x02\u0195\u0193\x03\x02\x02\x02\u0195" +
		"\u0196\x03\x02\x02\x02\u0196\u0198\x03\x02\x02\x02\u0197\u0199\x07\n\x02" +
		"\x02\u0198\u0197\x03\x02\x02\x02\u0198\u0199\x03\x02\x02\x02\u0199\u019A" +
		"\x03\x02\x02\x02\u019A\u019B\x07\x05\x02\x02\u019B%\x03\x02\x02\x02\u019C" +
		"\u019D\x05(\x15\x02\u019D\u019E\x07\x07\x02\x02\u019E\u019F\x05\"\x12" +
		"\x02\u019F\u01A0\x07\n\x02\x02\u01A0\u01A2\x03\x02\x02\x02\u01A1\u019C" +
		"\x03\x02\x02\x02\u01A2\u01A5\x03\x02\x02\x02\u01A3\u01A1\x03\x02\x02\x02" +
		"\u01A3\u01A4\x03\x02\x02\x02\u01A4\u01AF\x03\x02\x02\x02\u01A5\u01A3\x03" +
		"\x02\x02\x02\u01A6\u01A7\x05(\x15\x02\u01A7\u01A8\x07\x07\x02\x02\u01A8" +
		"\u01A9\x05\"\x12\x02\u01A9\u01AD\x03\x02\x02\x02\u01AA\u01AE\x07\n\x02" +
		"\x02\u01AB\u01AC\x07\r\x02\x02\u01AC\u01AE\x07C\x02\x02\u01AD\u01AA\x03" +
		"\x02\x02\x02\u01AD\u01AB\x03\x02\x02\x02\u01AD\u01AE\x03\x02\x02\x02\u01AE" +
		"\u01B0\x03\x02\x02\x02\u01AF\u01A6\x03\x02\x02\x02\u01AF\u01B0\x03\x02" +
		"\x02\x02\u01B0\u01B4\x03\x02\x02\x02\u01B1\u01B2\x07\r\x02\x02\u01B2\u01B4" +
		"\x07C\x02\x02\u01B3\u01A3\x03\x02\x02\x02\u01B3\u01B1\x03\x02\x02\x02" +
		"\u01B4\'\x03\x02\x02\x02\u01B5\u01B6\x05N(\x02\u01B6)\x03\x02\x02\x02" +
		"\u01B7\u01B8\b\x16\x01\x02\u01B8\u024E\x054\x1B\x02\u01B9\u01BA\x05D#" +
		"\x02\u01BA\u01BC\x07A\x02\x02\u01BB\u01BD\x05@!\x02\u01BC\u01BB\x03\x02" +
		"\x02\x02\u01BC\u01BD\x03\x02\x02\x02\u01BD\u01BE\x03\x02\x02\x02\u01BE" +
		"\u01BF\x07B\x02\x02\u01BF\u024E\x03\x02\x02\x02\u01C0\u01C1\x076\x02\x02" +
		"\u01C1\u024E\x05*\x16\x1B\u01C2\u01C3\x05L\'\x02\u01C3\u01C4\x07\"\x02" +
		"\x02\u01C4\u01C5\x07@\x02\x02\u01C5\u01C6\x05*\x16\x17\u01C6\u024E\x03" +
		"\x02\x02\x02\u01C7\u01C8\x07-\x02\x02\u01C8\u01C9\x07\x04\x02\x02\u01C9" +
		"\u01CE\x05*\x16\x02\u01CA\u01CB\x07\n\x02\x02\u01CB\u01CD\x05*\x16\x02" +
		"\u01CC\u01CA\x03\x02\x02\x02\u01CD\u01D0\x03\x02\x02\x02\u01CE\u01CC\x03" +
		"\x02\x02\x02\u01CE\u01CF\x03\x02\x02\x02\u01CF\u01D2\x03\x02\x02\x02\u01D0" +
		"\u01CE\x03\x02\x02\x02\u01D1\u01D3\x07\n\x02\x02\u01D2\u01D1\x03\x02\x02" +
		"\x02\u01D2\u01D3\x03\x02\x02\x02\u01D3\u01D4\x03\x02\x02\x02\u01D4\u01D5" +
		"\x07\x05\x02\x02\u01D5\u024E\x03\x02\x02\x02\u01D6\u01D7\x07.\x02\x02" +
		"\u01D7\u01D8\x07\x04\x02\x02\u01D8\u01DD\x05*\x16\x02\u01D9\u01DA\x07" +
		"\n\x02\x02\u01DA\u01DC\x05*\x16\x02\u01DB\u01D9\x03\x02\x02\x02\u01DC" +
		"\u01DF\x03\x02\x02\x02\u01DD\u01DB\x03\x02\x02\x02\u01DD\u01DE\x03\x02" +
		"\x02\x02\u01DE\u01E1\x03\x02\x02\x02\u01DF\u01DD\x03\x02\x02\x02\u01E0" +
		"\u01E2\x07\n\x02\x02\u01E1\u01E0\x03\x02\x02\x02\u01E1\u01E2\x03\x02\x02" +
		"\x02\u01E2\u01E3\x03\x02\x02\x02\u01E3\u01E4\x07\x05\x02\x02\u01E4\u024E" +
		"\x03\x02\x02\x02\u01E5\u024E\x05,\x17\x02\u01E6\u01E7\x07#\x02\x02\u01E7" +
		"\u01E8\x07\x04\x02\x02\u01E8\u01ED\x05*\x16\x02\u01E9\u01EA\x07\n\x02" +
		"\x02\u01EA\u01EC\x05*\x16\x02\u01EB\u01E9\x03\x02\x02\x02\u01EC\u01EF" +
		"\x03\x02\x02\x02\u01ED\u01EB\x03\x02\x02\x02\u01ED\u01EE\x03\x02\x02\x02" +
		"\u01EE\u01F1\x03\x02\x02\x02\u01EF\u01ED\x03\x02\x02\x02\u01F0\u01F2\x07" +
		"\n\x02\x02\u01F1\u01F0\x03\x02\x02\x02\u01F1\u01F2\x03\x02\x02\x02\u01F2" +
		"\u01F3\x03\x02\x02\x02\u01F3\u01F4\x07\x05\x02\x02";
	private static readonly _serializedATNSegment1: string =
		"\u01F4\u024E\x03\x02\x02\x02\u01F5\u01F6\x07$\x02\x02\u01F6\u01F7\x07" +
		"\x04\x02\x02\u01F7\u01FC\x05*\x16\x02\u01F8\u01F9\x07\n\x02\x02\u01F9" +
		"\u01FB\x05*\x16\x02\u01FA\u01F8\x03\x02\x02\x02\u01FB\u01FE\x03\x02\x02" +
		"\x02\u01FC\u01FA\x03\x02\x02\x02\u01FC\u01FD\x03\x02\x02\x02\u01FD\u0200" +
		"\x03\x02\x02\x02\u01FE\u01FC\x03\x02\x02\x02\u01FF\u0201\x07\n\x02\x02" +
		"\u0200\u01FF\x03\x02\x02\x02\u0200\u0201\x03\x02\x02\x02\u0201\u0202\x03" +
		"\x02\x02\x02\u0202\u0203\x07\x05\x02\x02\u0203\u024E\x03\x02\x02\x02\u0204" +
		"\u0209\x05L\'\x02\u0205\u0209\x07,\x02\x02\u0206\u0209\x07+\x02\x02\u0207" +
		"\u0209\x07*\x02\x02\u0208\u0204\x03\x02\x02\x02\u0208\u0205\x03\x02\x02" +
		"\x02\u0208\u0206\x03\x02\x02\x02\u0208\u0207\x03\x02\x02\x02\u0209\u024E" +
		"\x03\x02\x02\x02\u020A\u020B\x07A\x02\x02\u020B\u020C\x05*\x16\x02\u020C" +
		"\u020D\x07\n\x02\x02\u020D\u0212\x05*\x16\x02\u020E\u020F\x07\n\x02\x02" +
		"\u020F\u0211\x05*\x16\x02\u0210\u020E\x03\x02\x02\x02\u0211\u0214\x03" +
		"\x02\x02\x02\u0212\u0210\x03\x02\x02\x02\u0212\u0213\x03\x02\x02\x02\u0213" +
		"\u0216\x03\x02\x02\x02\u0214\u0212\x03\x02\x02\x02\u0215\u0217\x07\n\x02" +
		"\x02\u0216\u0215\x03\x02\x02\x02\u0216\u0217\x03\x02\x02\x02\u0217\u0218" +
		"\x03\x02\x02\x02\u0218\u0219\x07B\x02\x02\u0219\u024E\x03\x02\x02\x02" +
		"\u021A\u021B\x07\x04\x02\x02\u021B\u0220\x05B\"\x02\u021C\u021D\x07\n" +
		"\x02\x02\u021D\u021F\x05B\"\x02\u021E\u021C\x03\x02\x02\x02\u021F\u0222" +
		"\x03\x02\x02\x02\u0220\u021E\x03\x02\x02\x02\u0220\u0221\x03\x02\x02\x02" +
		"\u0221\u0224\x03\x02\x02\x02\u0222\u0220\x03\x02\x02\x02\u0223\u0225\x07" +
		"\n\x02\x02\u0224\u0223\x03\x02\x02\x02\u0224\u0225\x03\x02\x02\x02\u0225" +
		"\u0226\x03\x02\x02\x02\u0226\u0227\x07\x05\x02\x02\u0227\u024E\x03\x02" +
		"\x02\x02\u0228\u0231\x07\x1C\x02\x02\u0229\u022E\x05*\x16\x02\u022A\u022B" +
		"\x07\n\x02\x02\u022B\u022D\x05*\x16\x02\u022C\u022A\x03\x02\x02\x02\u022D" +
		"\u0230\x03\x02\x02\x02\u022E\u022C\x03\x02\x02\x02\u022E\u022F\x03\x02" +
		"\x02\x02\u022F\u0232\x03\x02\x02\x02\u0230\u022E\x03\x02\x02\x02\u0231" +
		"\u0229\x03\x02\x02\x02\u0231\u0232\x03\x02\x02\x02\u0232\u0234\x03\x02" +
		"\x02\x02\u0233\u0235\x07\n\x02\x02\u0234\u0233\x03\x02\x02\x02\u0234\u0235" +
		"\x03\x02\x02\x02\u0235\u0236\x03\x02\x02\x02\u0236\u024E\x07\x1D\x02\x02" +
		"\u0237\u0238\x07%\x02\x02\u0238\u0239\x07A\x02\x02\u0239\u023A\x05*\x16" +
		"\x02\u023A\u023B\x07B\x02\x02\u023B\u023C\x05*\x16\x02\u023C\u023D\x07" +
		"&\x02\x02\u023D\u023E\x05*\x16\x07\u023E\u024E\x03\x02\x02\x02\u023F\u0240" +
		"\x05\n\x06\x02\u0240\u0241\x05*\x16\x06\u0241\u024E\x03\x02\x02\x02\u0242" +
		"\u0243\x05\x10\t\x02\u0243\u0244\x05*\x16\x05\u0244\u024E\x03\x02\x02" +
		"\x02\u0245\u0246\x07A\x02\x02\u0246\u0247\x05*\x16\x02\u0247\u0248\x07" +
		"B\x02\x02\u0248\u024E\x03\x02\x02\x02\u0249\u024A\x07\x04\x02\x02\u024A" +
		"\u024B\x05*\x16\x02\u024B\u024C\x07\x05\x02\x02\u024C\u024E\x03\x02\x02" +
		"\x02\u024D\u01B7\x03\x02\x02\x02\u024D\u01B9\x03\x02\x02\x02\u024D\u01C0" +
		"\x03\x02\x02\x02\u024D\u01C2\x03\x02\x02\x02\u024D\u01C7\x03\x02\x02\x02" +
		"\u024D\u01D6\x03\x02\x02\x02\u024D\u01E5\x03\x02\x02\x02\u024D\u01E6\x03" +
		"\x02\x02\x02\u024D\u01F5\x03\x02\x02\x02\u024D\u0208\x03\x02\x02\x02\u024D" +
		"\u020A\x03\x02\x02\x02\u024D\u021A\x03\x02\x02\x02\u024D\u0228\x03\x02" +
		"\x02\x02\u024D\u0237\x03\x02\x02\x02\u024D\u023F\x03\x02\x02\x02\u024D" +
		"\u0242\x03\x02\x02\x02\u024D\u0245\x03\x02\x02\x02\u024D\u0249\x03\x02" +
		"\x02\x02\u024E\u0280\x03\x02\x02\x02\u024F\u0250\f\x1C\x02\x02\u0250\u0251" +
		"\x07!\x02\x02\u0251\u027F\x05*\x16\x1C\u0252\u0253\f\x1A\x02\x02\u0253" +
		"\u0254\t\x02\x02\x02\u0254\u027F\x05*\x16\x1B\u0255\u0256\f\x19\x02\x02" +
		"\u0256\u0257\t\x03\x02\x02\u0257\u027F\x05*\x16\x1A\u0258\u0259\f\x18" +
		"\x02\x02\u0259\u025A\t\x04\x02\x02\u025A\u027F\x05*\x16\x19\u025B\u025C" +
		"\f\x16\x02\x02\u025C\u025D\x07@\x02\x02\u025D\u025E\x05*\x16\x17\u025E" +
		"\u025F\b\x16\x01\x02\u025F\u027F\x03\x02\x02\x02\u0260\u0261\f\x14\x02" +
		"\x02\u0261\u0262\x07-\x02\x02\u0262\u027F\x05*\x16\x15\u0263\u0264\f\x12" +
		"\x02\x02\u0264\u0265\x07.\x02\x02\u0265\u027F\x05*\x16\x13\u0266\u0267" +
		"\f\x11\x02\x02\u0267\u0268\x07/\x02\x02\u0268\u027F\x05*\x16\x12\u0269" +
		"\u026A\f\x10\x02\x02\u026A\u026B\x070\x02\x02\u026B\u027F\x05*\x16\x11" +
		"\u026C\u026D\f\n\x02\x02\u026D\u026E\x07\x1A\x02\x02\u026E\u027F\x05*" +
		"\x16\v\u026F\u0270\f \x02\x02\u0270\u0271\x07\x16\x02\x02\u0271\u0277" +
		"\x05F$\x02\u0272\u0274\x07A\x02\x02\u0273\u0275\x05@!\x02\u0274\u0273" +
		"\x03\x02\x02\x02\u0274\u0275\x03\x02\x02\x02\u0275\u0276\x03\x02\x02\x02" +
		"\u0276\u0278\x07B\x02\x02\u0277\u0272\x03\x02\x02\x02\u0277\u0278\x03" +
		"\x02\x02\x02\u0278\u027F\x03\x02\x02\x02\u0279\u027A\f\x1D\x02\x02\u027A" +
		"\u027B\x07\x1C\x02\x02\u027B\u027C\x05*\x16\x02\u027C\u027D\x07\x1D\x02" +
		"\x02\u027D\u027F\x03\x02\x02\x02\u027E\u024F\x03\x02\x02\x02\u027E\u0252" +
		"\x03\x02\x02\x02\u027E\u0255\x03\x02\x02\x02\u027E\u0258\x03\x02\x02\x02" +
		"\u027E\u025B\x03\x02\x02\x02\u027E\u0260\x03\x02\x02\x02\u027E\u0263\x03" +
		"\x02\x02\x02\u027E\u0266\x03\x02\x02\x02\u027E\u0269\x03\x02\x02\x02\u027E" +
		"\u026C\x03\x02\x02\x02\u027E\u026F\x03\x02\x02\x02\u027E\u0279\x03\x02" +
		"\x02\x02\u027F\u0282\x03\x02\x02\x02\u0280\u027E\x03\x02\x02\x02\u0280" +
		"\u0281\x03\x02\x02\x02\u0281+\x03\x02\x02\x02\u0282\u0280\x03\x02\x02" +
		"\x02\u0283\u0284\x074\x02\x02\u0284\u0285\x05*\x16\x02\u0285\u0287\x07" +
		"\x04\x02\x02\u0286\u0288\x07\r\x02\x02\u0287\u0286\x03\x02\x02\x02\u0287" +
		"\u0288\x03\x02\x02\x02\u0288\u0289\x03\x02\x02\x02\u0289\u028E\x05.\x18" +
		"\x02\u028A\u028B\x07\r\x02\x02\u028B\u028D\x05.\x18\x02\u028C\u028A\x03" +
		"\x02\x02\x02\u028D\u0290\x03\x02\x02\x02\u028E\u028C\x03\x02\x02\x02\u028E" +
		"\u028F\x03\x02\x02\x02\u028F\u0291\x03\x02\x02\x02\u0290\u028E\x03\x02" +
		"\x02\x02\u0291\u0292\x07\x05\x02\x02\u0292-\x03\x02\x02\x02\u0293\u0296" +
		"\x050\x19\x02\u0294\u0296\x07\'\x02\x02\u0295\u0293\x03\x02\x02\x02\u0295" +
		"\u0294\x03\x02\x02\x02\u0296\u0297\x03\x02\x02\x02\u0297\u0298\x07\x1B" +
		"\x02\x02\u0298\u0299\x05*\x16\x02\u0299/\x03\x02\x02\x02\u029A\u02A1\x05" +
		"N(\x02\u029B\u029E\x07A\x02\x02\u029C\u029F\x05N(\x02\u029D\u029F\x07" +
		"\'\x02\x02\u029E\u029C\x03\x02\x02\x02\u029E\u029D\x03\x02\x02\x02\u029F" +
		"\u02A0\x03\x02\x02\x02\u02A0\u02A2\x07B\x02\x02\u02A1\u029B\x03\x02\x02" +
		"\x02\u02A1\u02A2\x03\x02\x02\x02\u02A21\x03\x02\x02\x02\u02A3\u02A4\x05" +
		"\b\x05\x02\u02A4\u02A5\x07\x02\x02\x03\u02A5\u02AD\x03\x02\x02\x02\u02A6" +
		"\u02A7\x05*\x16\x02\u02A7\u02A8\x07\x02\x02\x03\u02A8\u02AD\x03\x02\x02" +
		"\x02\u02A9\u02AA\x07D\x02\x02\u02AA\u02AD\x07\x02\x02\x03\u02AB\u02AD" +
		"\x07\x02\x02\x03\u02AC\u02A3\x03\x02\x02\x02\u02AC\u02A6\x03\x02\x02\x02" +
		"\u02AC\u02A9\x03\x02\x02\x02\u02AC\u02AB\x03\x02\x02\x02\u02AD3\x03\x02" +
		"\x02\x02\u02AE\u02B1\x056\x1C\x02\u02AF\u02B1\x058\x1D\x02\u02B0\u02AE" +
		"\x03\x02\x02\x02\u02B0\u02AF\x03\x02\x02\x02\u02B15\x03\x02\x02\x02\u02B2" +
		"\u02B3\x05<\x1F\x02\u02B3\u02B4\x07\x1B\x02\x02\u02B4\u02B5\x05*\x16\x02" +
		"\u02B5\u02C4\x03\x02\x02\x02\u02B6\u02B7\x07A\x02\x02\u02B7\u02BC\x05" +
		"<\x1F\x02\u02B8\u02B9\x07\n\x02\x02\u02B9\u02BB\x05<\x1F\x02\u02BA\u02B8" +
		"\x03\x02\x02\x02\u02BB\u02BE\x03\x02\x02\x02\u02BC\u02BA\x03\x02\x02\x02" +
		"\u02BC\u02BD\x03\x02\x02\x02\u02BD\u02BF\x03\x02\x02\x02\u02BE\u02BC\x03" +
		"\x02\x02\x02\u02BF\u02C0\x07B\x02\x02\u02C0\u02C1\x07\x1B\x02\x02\u02C1" +
		"\u02C2\x05*\x16\x02\u02C2\u02C4\x03\x02\x02\x02\u02C3\u02B2\x03\x02\x02" +
		"\x02\u02C3\u02B6\x03\x02\x02\x02\u02C47\x03\x02\x02\x02\u02C5\u02C6\x07" +
		"A\x02\x02\u02C6\u02C7\x07A\x02\x02\u02C7\u02CA\x05<\x1F\x02\u02C8\u02C9" +
		"\x07\n\x02\x02\u02C9\u02CB\x05<\x1F\x02\u02CA\u02C8\x03\x02\x02\x02\u02CB" +
		"\u02CC\x03\x02\x02\x02\u02CC\u02CA\x03\x02\x02\x02\u02CC\u02CD\x03\x02" +
		"\x02\x02\u02CD\u02CE\x03\x02\x02\x02\u02CE\u02CF\x07B\x02\x02\u02CF\u02D0" +
		"\x07B\x02\x02\u02D0\u02D1\x07\x1B\x02\x02\u02D1\u02D2\x05*\x16\x02\u02D2" +
		"9\x03\x02\x02\x02\u02D3\u02D6\x07\'\x02\x02\u02D4\u02D6\x05L\'\x02\u02D5" +
		"\u02D3\x03\x02\x02\x02\u02D5\u02D4\x03\x02\x02\x02\u02D6;\x03\x02\x02" +
		"\x02\u02D7\u02D8\x05:\x1E\x02\u02D8=\x03\x02\x02\x02\u02D9\u02DC\x077" +
		"\x02\x02\u02DA\u02DC\x05L\'\x02\u02DB\u02D9\x03\x02\x02\x02\u02DB\u02DA" +
		"\x03\x02\x02\x02\u02DC?\x03\x02\x02\x02\u02DD\u02E2\x05*\x16\x02\u02DE" +
		"\u02DF\x07\n\x02\x02\u02DF\u02E1\x05*\x16\x02\u02E0\u02DE\x03\x02\x02" +
		"\x02\u02E1\u02E4\x03\x02\x02\x02\u02E2\u02E0\x03\x02\x02\x02\u02E2\u02E3" +
		"\x03\x02\x02\x02\u02E3A\x03\x02\x02\x02\u02E4\u02E2\x03\x02\x02\x02\u02E5" +
		"\u02E6\x05N(\x02\u02E6\u02E7\x07\x07\x02\x02\u02E7\u02E8\x05*\x16\x02" +
		"\u02E8\u02EC\x03\x02\x02\x02\u02E9\u02EA\x07(\x02\x02\u02EA\u02EC\x05" +
		"*\x16\x02\u02EB\u02E5\x03\x02\x02\x02\u02EB\u02E9\x03\x02\x02\x02\u02EC" +
		"C\x03\x02\x02\x02\u02ED\u02F0\x05L\'\x02\u02EE\u02F0\t\x05\x02\x02\u02EF" +
		"\u02ED\x03\x02\x02\x02\u02EF\u02EE\x03\x02\x02\x02\u02F0E\x03\x02\x02" +
		"\x02\u02F1\u02F4\x05L\'\x02\u02F2\u02F4\t\x06\x02\x02\u02F3\u02F1\x03" +
		"\x02\x02\x02\u02F3\u02F2\x03\x02\x02\x02\u02F4G\x03\x02\x02\x02\u02F5" +
		"\u02F6\t\x07\x02\x02\u02F6I\x03\x02\x02\x02\u02F7\u02F8\t\b\x02\x02\u02F8" +
		"K\x03\x02\x02\x02\u02F9\u02FE\x07C\x02\x02\u02FA\u02FB\x07)\x02\x02\u02FB" +
		"\u02FD\x07C\x02\x02\u02FC\u02FA\x03\x02\x02\x02\u02FD\u0300\x03\x02\x02" +
		"\x02\u02FE\u02FC\x03\x02\x02\x02\u02FE\u02FF\x03\x02\x02\x02\u02FFM\x03" +
		"\x02\x02\x02\u0300\u02FE\x03\x02\x02\x02\u0301\u0306\x07C\x02\x02\u0302" +
		"\u0303\x05L\'\x02\u0303\u0304\b(\x01\x02\u0304\u0306\x03\x02\x02\x02\u0305" +
		"\u0301\x03\x02\x02\x02\u0305\u0302\x03\x02\x02\x02\u0306O\x03\x02\x02" +
		"\x02\u0307\u0308\x07\x02\x02\x03\u0308Q\x03\x02\x02\x02WU\\em\x86\x90" +
		"\x93\x98\xA7\xAE\xB2\xB5\xC2\xC9\xCC\xD3\xD9\xDE\xE9\xF1\xF7\xFB\xFD\u0108" +
		"\u010A\u0119\u0121\u0130\u0138\u013A\u014B\u014E\u0151\u0168\u016C\u0177" +
		"\u0181\u0189\u018B\u0195\u0198\u01A3\u01AD\u01AF\u01B3\u01BC\u01CE\u01D2" +
		"\u01DD\u01E1\u01ED\u01F1\u01FC\u0200\u0208\u0212\u0216\u0220\u0224\u022E" +
		"\u0231\u0234\u024D\u0274\u0277\u027E\u0280\u0287\u028E\u0295\u029E\u02A1" +
		"\u02AC\u02B0\u02BC\u02C3\u02CC\u02D5\u02DB\u02E2\u02EB\u02EF\u02F3\u02FE" +
		"\u0305";
	public static readonly _serializedATN: string = Utils.join(
		[
			QuintParser._serializedATNSegment0,
			QuintParser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!QuintParser.__ATN) {
			QuintParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(QuintParser._serializedATN));
		}

		return QuintParser.__ATN;
	}

}

export class ModulesContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(QuintParser.EOF, 0); }
	public module(): ModuleContext[];
	public module(i: number): ModuleContext;
	public module(i?: number): ModuleContext | ModuleContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ModuleContext);
		} else {
			return this.getRuleContext(i, ModuleContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_modules; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterModules) {
			listener.enterModules(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitModules) {
			listener.exitModules(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitModules) {
			return visitor.visitModules(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModuleContext extends ParserRuleContext {
	public qualId(): QualIdContext {
		return this.getRuleContext(0, QualIdContext);
	}
	public DOCCOMMENT(): TerminalNode[];
	public DOCCOMMENT(i: number): TerminalNode;
	public DOCCOMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(QuintParser.DOCCOMMENT);
		} else {
			return this.getToken(QuintParser.DOCCOMMENT, i);
		}
	}
	public documentedDeclaration(): DocumentedDeclarationContext[];
	public documentedDeclaration(i: number): DocumentedDeclarationContext;
	public documentedDeclaration(i?: number): DocumentedDeclarationContext | DocumentedDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocumentedDeclarationContext);
		} else {
			return this.getRuleContext(i, DocumentedDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_module; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterModule) {
			listener.enterModule(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitModule) {
			listener.exitModule(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitModule) {
			return visitor.visitModule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DocumentedDeclarationContext extends ParserRuleContext {
	public declaration(): DeclarationContext {
		return this.getRuleContext(0, DeclarationContext);
	}
	public DOCCOMMENT(): TerminalNode[];
	public DOCCOMMENT(i: number): TerminalNode;
	public DOCCOMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(QuintParser.DOCCOMMENT);
		} else {
			return this.getToken(QuintParser.DOCCOMMENT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_documentedDeclaration; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterDocumentedDeclaration) {
			listener.enterDocumentedDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitDocumentedDeclaration) {
			listener.exitDocumentedDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitDocumentedDeclaration) {
			return visitor.visitDocumentedDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_declaration; }
	public copyFrom(ctx: DeclarationContext): void {
		super.copyFrom(ctx);
	}
}
export class ConstContext extends DeclarationContext {
	public qualId(): QualIdContext {
		return this.getRuleContext(0, QualIdContext);
	}
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	constructor(ctx: DeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterConst) {
			listener.enterConst(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitConst) {
			listener.exitConst(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitConst) {
			return visitor.visitConst(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class VarContext extends DeclarationContext {
	public qualId(): QualIdContext {
		return this.getRuleContext(0, QualIdContext);
	}
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	constructor(ctx: DeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterVar) {
			listener.enterVar(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitVar) {
			listener.exitVar(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitVar) {
			return visitor.visitVar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AssumeContext extends DeclarationContext {
	public identOrHole(): IdentOrHoleContext {
		return this.getRuleContext(0, IdentOrHoleContext);
	}
	public ASGN(): TerminalNode { return this.getToken(QuintParser.ASGN, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: DeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterAssume) {
			listener.enterAssume(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitAssume) {
			listener.exitAssume(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitAssume) {
			return visitor.visitAssume(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InstanceContext extends DeclarationContext {
	public instanceMod(): InstanceModContext {
		return this.getRuleContext(0, InstanceModContext);
	}
	constructor(ctx: DeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterInstance) {
			listener.enterInstance(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitInstance) {
			listener.exitInstance(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitInstance) {
			return visitor.visitInstance(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OperContext extends DeclarationContext {
	public operDef(): OperDefContext {
		return this.getRuleContext(0, OperDefContext);
	}
	constructor(ctx: DeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterOper) {
			listener.enterOper(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitOper) {
			listener.exitOper(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitOper) {
			return visitor.visitOper(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeDefsContext extends DeclarationContext {
	public typeDef(): TypeDefContext {
		return this.getRuleContext(0, TypeDefContext);
	}
	constructor(ctx: DeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeDefs) {
			listener.enterTypeDefs(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeDefs) {
			listener.exitTypeDefs(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeDefs) {
			return visitor.visitTypeDefs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ImportDefContext extends DeclarationContext {
	public importMod(): ImportModContext {
		return this.getRuleContext(0, ImportModContext);
	}
	constructor(ctx: DeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterImportDef) {
			listener.enterImportDef(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitImportDef) {
			listener.exitImportDef(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitImportDef) {
			return visitor.visitImportDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExportDefContext extends DeclarationContext {
	public exportMod(): ExportModContext {
		return this.getRuleContext(0, ExportModContext);
	}
	constructor(ctx: DeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterExportDef) {
			listener.enterExportDef(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitExportDef) {
			listener.exitExportDef(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitExportDef) {
			return visitor.visitExportDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperDefContext extends ParserRuleContext {
	public qualifier(): QualifierContext {
		return this.getRuleContext(0, QualifierContext);
	}
	public normalCallName(): NormalCallNameContext {
		return this.getRuleContext(0, NormalCallNameContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(QuintParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(QuintParser.RPAREN, 0); }
	public type(): TypeContext[];
	public type(i: number): TypeContext;
	public type(i?: number): TypeContext | TypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeContext);
		} else {
			return this.getRuleContext(i, TypeContext);
		}
	}
	public ASGN(): TerminalNode | undefined { return this.tryGetToken(QuintParser.ASGN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public parameter(): ParameterContext[];
	public parameter(i: number): ParameterContext;
	public parameter(i?: number): ParameterContext | ParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParameterContext);
		} else {
			return this.getRuleContext(i, ParameterContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_operDef; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterOperDef) {
			listener.enterOperDef(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitOperDef) {
			listener.exitOperDef(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitOperDef) {
			return visitor.visitOperDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeDefContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_typeDef; }
	public copyFrom(ctx: TypeDefContext): void {
		super.copyFrom(ctx);
	}
}
export class TypeAbstractDefContext extends TypeDefContext {
	public qualId(): QualIdContext {
		return this.getRuleContext(0, QualIdContext);
	}
	constructor(ctx: TypeDefContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeAbstractDef) {
			listener.enterTypeAbstractDef(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeAbstractDef) {
			listener.exitTypeAbstractDef(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeAbstractDef) {
			return visitor.visitTypeAbstractDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeAliasDefContext extends TypeDefContext {
	public qualId(): QualIdContext {
		return this.getRuleContext(0, QualIdContext);
	}
	public ASGN(): TerminalNode { return this.getToken(QuintParser.ASGN, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	constructor(ctx: TypeDefContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeAliasDef) {
			listener.enterTypeAliasDef(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeAliasDef) {
			listener.exitTypeAliasDef(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeAliasDef) {
			return visitor.visitTypeAliasDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeSumDefContext extends TypeDefContext {
	public _typeName!: QualIdContext;
	public ASGN(): TerminalNode { return this.getToken(QuintParser.ASGN, 0); }
	public typeSumVariant(): TypeSumVariantContext[];
	public typeSumVariant(i: number): TypeSumVariantContext;
	public typeSumVariant(i?: number): TypeSumVariantContext | TypeSumVariantContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeSumVariantContext);
		} else {
			return this.getRuleContext(i, TypeSumVariantContext);
		}
	}
	public qualId(): QualIdContext {
		return this.getRuleContext(0, QualIdContext);
	}
	constructor(ctx: TypeDefContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeSumDef) {
			listener.enterTypeSumDef(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeSumDef) {
			listener.exitTypeSumDef(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeSumDef) {
			return visitor.visitTypeSumDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeSumVariantContext extends ParserRuleContext {
	public _sumLabel!: SimpleIdContext;
	public simpleId(): SimpleIdContext {
		return this.getRuleContext(0, SimpleIdContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(QuintParser.LPAREN, 0); }
	public type(): TypeContext | undefined {
		return this.tryGetRuleContext(0, TypeContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(QuintParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_typeSumVariant; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeSumVariant) {
			listener.enterTypeSumVariant(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeSumVariant) {
			listener.exitTypeSumVariant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeSumVariant) {
			return visitor.visitTypeSumVariant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NondetOperDefContext extends ParserRuleContext {
	public qualId(): QualIdContext {
		return this.getRuleContext(0, QualIdContext);
	}
	public ASGN(): TerminalNode { return this.getToken(QuintParser.ASGN, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public type(): TypeContext | undefined {
		return this.tryGetRuleContext(0, TypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_nondetOperDef; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterNondetOperDef) {
			listener.enterNondetOperDef(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitNondetOperDef) {
			listener.exitNondetOperDef(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitNondetOperDef) {
			return visitor.visitNondetOperDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifierContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_qualifier; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterQualifier) {
			listener.enterQualifier(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitQualifier) {
			listener.exitQualifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitQualifier) {
			return visitor.visitQualifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportModContext extends ParserRuleContext {
	public name(): NameContext[];
	public name(i: number): NameContext;
	public name(i?: number): NameContext | NameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NameContext);
		} else {
			return this.getRuleContext(i, NameContext);
		}
	}
	public identOrStar(): IdentOrStarContext | undefined {
		return this.tryGetRuleContext(0, IdentOrStarContext);
	}
	public fromSource(): FromSourceContext | undefined {
		return this.tryGetRuleContext(0, FromSourceContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_importMod; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterImportMod) {
			listener.enterImportMod(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitImportMod) {
			listener.exitImportMod(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitImportMod) {
			return visitor.visitImportMod(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExportModContext extends ParserRuleContext {
	public name(): NameContext[];
	public name(i: number): NameContext;
	public name(i?: number): NameContext | NameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NameContext);
		} else {
			return this.getRuleContext(i, NameContext);
		}
	}
	public identOrStar(): IdentOrStarContext | undefined {
		return this.tryGetRuleContext(0, IdentOrStarContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_exportMod; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterExportMod) {
			listener.enterExportMod(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitExportMod) {
			listener.exitExportMod(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitExportMod) {
			return visitor.visitExportMod(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InstanceModContext extends ParserRuleContext {
	public moduleName(): ModuleNameContext {
		return this.getRuleContext(0, ModuleNameContext);
	}
	public LPAREN(): TerminalNode { return this.getToken(QuintParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(QuintParser.RPAREN, 0); }
	public MUL(): TerminalNode | undefined { return this.tryGetToken(QuintParser.MUL, 0); }
	public name(): NameContext[];
	public name(i: number): NameContext;
	public name(i?: number): NameContext | NameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NameContext);
		} else {
			return this.getRuleContext(i, NameContext);
		}
	}
	public ASGN(): TerminalNode[];
	public ASGN(i: number): TerminalNode;
	public ASGN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(QuintParser.ASGN);
		} else {
			return this.getToken(QuintParser.ASGN, i);
		}
	}
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public fromSource(): FromSourceContext | undefined {
		return this.tryGetRuleContext(0, FromSourceContext);
	}
	public qualifiedName(): QualifiedNameContext | undefined {
		return this.tryGetRuleContext(0, QualifiedNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_instanceMod; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterInstanceMod) {
			listener.enterInstanceMod(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitInstanceMod) {
			listener.exitInstanceMod(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitInstanceMod) {
			return visitor.visitInstanceMod(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModuleNameContext extends ParserRuleContext {
	public qualId(): QualIdContext {
		return this.getRuleContext(0, QualIdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_moduleName; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterModuleName) {
			listener.enterModuleName(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitModuleName) {
			listener.exitModuleName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitModuleName) {
			return visitor.visitModuleName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NameContext extends ParserRuleContext {
	public qualId(): QualIdContext {
		return this.getRuleContext(0, QualIdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_name; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterName) {
			listener.enterName(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitName) {
			listener.exitName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitName) {
			return visitor.visitName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedNameContext extends ParserRuleContext {
	public qualId(): QualIdContext {
		return this.getRuleContext(0, QualIdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_qualifiedName; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterQualifiedName) {
			listener.enterQualifiedName(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitQualifiedName) {
			listener.exitQualifiedName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitQualifiedName) {
			return visitor.visitQualifiedName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FromSourceContext extends ParserRuleContext {
	public STRING(): TerminalNode { return this.getToken(QuintParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_fromSource; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterFromSource) {
			listener.enterFromSource(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitFromSource) {
			listener.exitFromSource(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitFromSource) {
			return visitor.visitFromSource(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_type; }
	public copyFrom(ctx: TypeContext): void {
		super.copyFrom(ctx);
	}
}
export class TypeFunContext extends TypeContext {
	public type(): TypeContext[];
	public type(i: number): TypeContext;
	public type(i?: number): TypeContext | TypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeContext);
		} else {
			return this.getRuleContext(i, TypeContext);
		}
	}
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeFun) {
			listener.enterTypeFun(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeFun) {
			listener.exitTypeFun(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeFun) {
			return visitor.visitTypeFun(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeOperContext extends TypeContext {
	public type(): TypeContext[];
	public type(i: number): TypeContext;
	public type(i?: number): TypeContext | TypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeContext);
		} else {
			return this.getRuleContext(i, TypeContext);
		}
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(QuintParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(QuintParser.RPAREN, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeOper) {
			listener.enterTypeOper(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeOper) {
			listener.exitTypeOper(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeOper) {
			return visitor.visitTypeOper(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeSetContext extends TypeContext {
	public SET(): TerminalNode { return this.getToken(QuintParser.SET, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeSet) {
			listener.enterTypeSet(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeSet) {
			listener.exitTypeSet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeSet) {
			return visitor.visitTypeSet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeListContext extends TypeContext {
	public LIST(): TerminalNode { return this.getToken(QuintParser.LIST, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeList) {
			listener.enterTypeList(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeList) {
			listener.exitTypeList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeList) {
			return visitor.visitTypeList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeTupleContext extends TypeContext {
	public LPAREN(): TerminalNode { return this.getToken(QuintParser.LPAREN, 0); }
	public type(): TypeContext[];
	public type(i: number): TypeContext;
	public type(i?: number): TypeContext | TypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeContext);
		} else {
			return this.getRuleContext(i, TypeContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(QuintParser.RPAREN, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeTuple) {
			listener.enterTypeTuple(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeTuple) {
			listener.exitTypeTuple(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeTuple) {
			return visitor.visitTypeTuple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeRecContext extends TypeContext {
	public row(): RowContext {
		return this.getRuleContext(0, RowContext);
	}
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeRec) {
			listener.enterTypeRec(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeRec) {
			listener.exitTypeRec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeRec) {
			return visitor.visitTypeRec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeUnionRecContext extends TypeContext {
	public typeUnionRecOne(): TypeUnionRecOneContext[];
	public typeUnionRecOne(i: number): TypeUnionRecOneContext;
	public typeUnionRecOne(i?: number): TypeUnionRecOneContext | TypeUnionRecOneContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeUnionRecOneContext);
		} else {
			return this.getRuleContext(i, TypeUnionRecOneContext);
		}
	}
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeUnionRec) {
			listener.enterTypeUnionRec(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeUnionRec) {
			listener.exitTypeUnionRec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeUnionRec) {
			return visitor.visitTypeUnionRec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeIntContext extends TypeContext {
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeInt) {
			listener.enterTypeInt(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeInt) {
			listener.exitTypeInt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeInt) {
			return visitor.visitTypeInt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeStrContext extends TypeContext {
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeStr) {
			listener.enterTypeStr(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeStr) {
			listener.exitTypeStr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeStr) {
			return visitor.visitTypeStr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeBoolContext extends TypeContext {
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeBool) {
			listener.enterTypeBool(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeBool) {
			listener.exitTypeBool(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeBool) {
			return visitor.visitTypeBool(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeConstOrVarContext extends TypeContext {
	public qualId(): QualIdContext {
		return this.getRuleContext(0, QualIdContext);
	}
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeConstOrVar) {
			listener.enterTypeConstOrVar(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeConstOrVar) {
			listener.exitTypeConstOrVar(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeConstOrVar) {
			return visitor.visitTypeConstOrVar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeParenContext extends TypeContext {
	public LPAREN(): TerminalNode { return this.getToken(QuintParser.LPAREN, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(QuintParser.RPAREN, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeParen) {
			listener.enterTypeParen(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeParen) {
			listener.exitTypeParen(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeParen) {
			return visitor.visitTypeParen(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeUnionRecOneContext extends ParserRuleContext {
	public qualId(): QualIdContext {
		return this.getRuleContext(0, QualIdContext);
	}
	public STRING(): TerminalNode { return this.getToken(QuintParser.STRING, 0); }
	public row(): RowContext | undefined {
		return this.tryGetRuleContext(0, RowContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_typeUnionRecOne; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTypeUnionRecOne) {
			listener.enterTypeUnionRecOne(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTypeUnionRecOne) {
			listener.exitTypeUnionRecOne(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTypeUnionRecOne) {
			return visitor.visitTypeUnionRecOne(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RowContext extends ParserRuleContext {
	public _rowVar!: Token;
	public rowLabel(): RowLabelContext[];
	public rowLabel(i: number): RowLabelContext;
	public rowLabel(i?: number): RowLabelContext | RowLabelContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RowLabelContext);
		} else {
			return this.getRuleContext(i, RowLabelContext);
		}
	}
	public type(): TypeContext[];
	public type(i: number): TypeContext;
	public type(i?: number): TypeContext | TypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeContext);
		} else {
			return this.getRuleContext(i, TypeContext);
		}
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(QuintParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_row; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterRow) {
			listener.enterRow(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitRow) {
			listener.exitRow(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitRow) {
			return visitor.visitRow(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RowLabelContext extends ParserRuleContext {
	public simpleId(): SimpleIdContext {
		return this.getRuleContext(0, SimpleIdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_rowLabel; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterRowLabel) {
			listener.enterRowLabel(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitRowLabel) {
			listener.exitRowLabel(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitRowLabel) {
			return visitor.visitRowLabel(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_expr; }
	public copyFrom(ctx: ExprContext): void {
		super.copyFrom(ctx);
	}
}
export class DotCallContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public nameAfterDot(): NameAfterDotContext {
		return this.getRuleContext(0, NameAfterDotContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(QuintParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(QuintParser.RPAREN, 0); }
	public argList(): ArgListContext | undefined {
		return this.tryGetRuleContext(0, ArgListContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterDotCall) {
			listener.enterDotCall(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitDotCall) {
			listener.exitDotCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitDotCall) {
			return visitor.visitDotCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LambdaConsContext extends ExprContext {
	public lambda(): LambdaContext {
		return this.getRuleContext(0, LambdaContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterLambdaCons) {
			listener.enterLambdaCons(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitLambdaCons) {
			listener.exitLambdaCons(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitLambdaCons) {
			return visitor.visitLambdaCons(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OperAppContext extends ExprContext {
	public normalCallName(): NormalCallNameContext {
		return this.getRuleContext(0, NormalCallNameContext);
	}
	public LPAREN(): TerminalNode { return this.getToken(QuintParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(QuintParser.RPAREN, 0); }
	public argList(): ArgListContext | undefined {
		return this.tryGetRuleContext(0, ArgListContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterOperApp) {
			listener.enterOperApp(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitOperApp) {
			listener.exitOperApp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitOperApp) {
			return visitor.visitOperApp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ListAppContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterListApp) {
			listener.enterListApp(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitListApp) {
			listener.exitListApp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitListApp) {
			return visitor.visitListApp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PowContext extends ExprContext {
	public _op!: Token;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterPow) {
			listener.enterPow(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitPow) {
			listener.exitPow(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitPow) {
			return visitor.visitPow(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UminusContext extends ExprContext {
	public MINUS(): TerminalNode { return this.getToken(QuintParser.MINUS, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterUminus) {
			listener.enterUminus(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitUminus) {
			listener.exitUminus(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitUminus) {
			return visitor.visitUminus(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultDivContext extends ExprContext {
	public _op!: Token;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public MUL(): TerminalNode | undefined { return this.tryGetToken(QuintParser.MUL, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(QuintParser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(QuintParser.MOD, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterMultDiv) {
			listener.enterMultDiv(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitMultDiv) {
			listener.exitMultDiv(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitMultDiv) {
			return visitor.visitMultDiv(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PlusMinusContext extends ExprContext {
	public _op!: Token;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(QuintParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(QuintParser.MINUS, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterPlusMinus) {
			listener.enterPlusMinus(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitPlusMinus) {
			listener.exitPlusMinus(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitPlusMinus) {
			return visitor.visitPlusMinus(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RelationsContext extends ExprContext {
	public _op!: Token;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public GT(): TerminalNode | undefined { return this.tryGetToken(QuintParser.GT, 0); }
	public LT(): TerminalNode | undefined { return this.tryGetToken(QuintParser.LT, 0); }
	public GE(): TerminalNode | undefined { return this.tryGetToken(QuintParser.GE, 0); }
	public LE(): TerminalNode | undefined { return this.tryGetToken(QuintParser.LE, 0); }
	public NE(): TerminalNode | undefined { return this.tryGetToken(QuintParser.NE, 0); }
	public EQ(): TerminalNode | undefined { return this.tryGetToken(QuintParser.EQ, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterRelations) {
			listener.enterRelations(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitRelations) {
			listener.exitRelations(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitRelations) {
			return visitor.visitRelations(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AsgnContext extends ExprContext {
	public qualId(): QualIdContext {
		return this.getRuleContext(0, QualIdContext);
	}
	public ASGN(): TerminalNode { return this.getToken(QuintParser.ASGN, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterAsgn) {
			listener.enterAsgn(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitAsgn) {
			listener.exitAsgn(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitAsgn) {
			return visitor.visitAsgn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ErrorEqContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public ASGN(): TerminalNode { return this.getToken(QuintParser.ASGN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterErrorEq) {
			listener.enterErrorEq(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitErrorEq) {
			listener.exitErrorEq(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitErrorEq) {
			return visitor.visitErrorEq(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AndExprContext extends ExprContext {
	public AND(): TerminalNode { return this.getToken(QuintParser.AND, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterAndExpr) {
			listener.enterAndExpr(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitAndExpr) {
			listener.exitAndExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitAndExpr) {
			return visitor.visitAndExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AndContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public AND(): TerminalNode { return this.getToken(QuintParser.AND, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterAnd) {
			listener.enterAnd(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitAnd) {
			listener.exitAnd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitAnd) {
			return visitor.visitAnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OrExprContext extends ExprContext {
	public OR(): TerminalNode { return this.getToken(QuintParser.OR, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterOrExpr) {
			listener.enterOrExpr(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitOrExpr) {
			listener.exitOrExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitOrExpr) {
			return visitor.visitOrExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OrContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public OR(): TerminalNode { return this.getToken(QuintParser.OR, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterOr) {
			listener.enterOr(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitOr) {
			listener.exitOr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitOr) {
			return visitor.visitOr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IffContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public IFF(): TerminalNode { return this.getToken(QuintParser.IFF, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterIff) {
			listener.enterIff(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitIff) {
			listener.exitIff(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitIff) {
			return visitor.visitIff(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ImpliesContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public IMPLIES(): TerminalNode { return this.getToken(QuintParser.IMPLIES, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterImplies) {
			listener.enterImplies(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitImplies) {
			listener.exitImplies(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitImplies) {
			return visitor.visitImplies(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MatchContext extends ExprContext {
	public matchSumExpr(): MatchSumExprContext {
		return this.getRuleContext(0, MatchSumExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterMatch) {
			listener.enterMatch(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitMatch) {
			listener.exitMatch(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitMatch) {
			return visitor.visitMatch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ActionAllContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterActionAll) {
			listener.enterActionAll(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitActionAll) {
			listener.exitActionAll(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitActionAll) {
			return visitor.visitActionAll(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ActionAnyContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterActionAny) {
			listener.enterActionAny(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitActionAny) {
			listener.exitActionAny(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitActionAny) {
			return visitor.visitActionAny(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LiteralOrIdContext extends ExprContext {
	public qualId(): QualIdContext | undefined {
		return this.tryGetRuleContext(0, QualIdContext);
	}
	public INT(): TerminalNode | undefined { return this.tryGetToken(QuintParser.INT, 0); }
	public BOOL(): TerminalNode | undefined { return this.tryGetToken(QuintParser.BOOL, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(QuintParser.STRING, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterLiteralOrId) {
			listener.enterLiteralOrId(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitLiteralOrId) {
			listener.exitLiteralOrId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitLiteralOrId) {
			return visitor.visitLiteralOrId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TupleContext extends ExprContext {
	public LPAREN(): TerminalNode { return this.getToken(QuintParser.LPAREN, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(QuintParser.RPAREN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterTuple) {
			listener.enterTuple(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitTuple) {
			listener.exitTuple(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitTuple) {
			return visitor.visitTuple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PairContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterPair) {
			listener.enterPair(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitPair) {
			listener.exitPair(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitPair) {
			return visitor.visitPair(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RecordContext extends ExprContext {
	public recElem(): RecElemContext[];
	public recElem(i: number): RecElemContext;
	public recElem(i?: number): RecElemContext | RecElemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RecElemContext);
		} else {
			return this.getRuleContext(i, RecElemContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterRecord) {
			listener.enterRecord(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitRecord) {
			listener.exitRecord(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitRecord) {
			return visitor.visitRecord(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ListContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterList) {
			listener.enterList(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitList) {
			listener.exitList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitList) {
			return visitor.visitList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IfElseContext extends ExprContext {
	public LPAREN(): TerminalNode { return this.getToken(QuintParser.LPAREN, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(QuintParser.RPAREN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterIfElse) {
			listener.enterIfElse(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitIfElse) {
			listener.exitIfElse(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitIfElse) {
			return visitor.visitIfElse(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LetInContext extends ExprContext {
	public operDef(): OperDefContext {
		return this.getRuleContext(0, OperDefContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterLetIn) {
			listener.enterLetIn(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitLetIn) {
			listener.exitLetIn(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitLetIn) {
			return visitor.visitLetIn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NondetContext extends ExprContext {
	public nondetOperDef(): NondetOperDefContext {
		return this.getRuleContext(0, NondetOperDefContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterNondet) {
			listener.enterNondet(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitNondet) {
			listener.exitNondet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitNondet) {
			return visitor.visitNondet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenContext extends ExprContext {
	public LPAREN(): TerminalNode { return this.getToken(QuintParser.LPAREN, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(QuintParser.RPAREN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterParen) {
			listener.enterParen(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitParen) {
			listener.exitParen(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitParen) {
			return visitor.visitParen(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BracesContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterBraces) {
			listener.enterBraces(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitBraces) {
			listener.exitBraces(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitBraces) {
			return visitor.visitBraces(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MatchSumExprContext extends ParserRuleContext {
	public _matchSumCase!: MatchSumCaseContext;
	public _matchCase: MatchSumCaseContext[] = [];
	public MATCH(): TerminalNode { return this.getToken(QuintParser.MATCH, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public matchSumCase(): MatchSumCaseContext[];
	public matchSumCase(i: number): MatchSumCaseContext;
	public matchSumCase(i?: number): MatchSumCaseContext | MatchSumCaseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MatchSumCaseContext);
		} else {
			return this.getRuleContext(i, MatchSumCaseContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_matchSumExpr; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterMatchSumExpr) {
			listener.enterMatchSumExpr(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitMatchSumExpr) {
			listener.exitMatchSumExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitMatchSumExpr) {
			return visitor.visitMatchSumExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MatchSumCaseContext extends ParserRuleContext {
	public _variantMatch!: MatchSumVariantContext;
	public _wildCardMatch!: Token;
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public matchSumVariant(): MatchSumVariantContext | undefined {
		return this.tryGetRuleContext(0, MatchSumVariantContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_matchSumCase; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterMatchSumCase) {
			listener.enterMatchSumCase(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitMatchSumCase) {
			listener.exitMatchSumCase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitMatchSumCase) {
			return visitor.visitMatchSumCase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MatchSumVariantContext extends ParserRuleContext {
	public _variantLabel!: SimpleIdContext;
	public _variantParam!: SimpleIdContext;
	public simpleId(): SimpleIdContext[];
	public simpleId(i: number): SimpleIdContext;
	public simpleId(i?: number): SimpleIdContext | SimpleIdContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SimpleIdContext);
		} else {
			return this.getRuleContext(i, SimpleIdContext);
		}
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(QuintParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(QuintParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_matchSumVariant; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterMatchSumVariant) {
			listener.enterMatchSumVariant(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitMatchSumVariant) {
			listener.exitMatchSumVariant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitMatchSumVariant) {
			return visitor.visitMatchSumVariant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationOrExprContext extends ParserRuleContext {
	public declaration(): DeclarationContext | undefined {
		return this.tryGetRuleContext(0, DeclarationContext);
	}
	public EOF(): TerminalNode { return this.getToken(QuintParser.EOF, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public DOCCOMMENT(): TerminalNode | undefined { return this.tryGetToken(QuintParser.DOCCOMMENT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_declarationOrExpr; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterDeclarationOrExpr) {
			listener.enterDeclarationOrExpr(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitDeclarationOrExpr) {
			listener.exitDeclarationOrExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitDeclarationOrExpr) {
			return visitor.visitDeclarationOrExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LambdaContext extends ParserRuleContext {
	public lambdaUnsugared(): LambdaUnsugaredContext | undefined {
		return this.tryGetRuleContext(0, LambdaUnsugaredContext);
	}
	public lambdaTupleSugar(): LambdaTupleSugarContext | undefined {
		return this.tryGetRuleContext(0, LambdaTupleSugarContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_lambda; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterLambda) {
			listener.enterLambda(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitLambda) {
			listener.exitLambda(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitLambda) {
			return visitor.visitLambda(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LambdaUnsugaredContext extends ParserRuleContext {
	public parameter(): ParameterContext[];
	public parameter(i: number): ParameterContext;
	public parameter(i?: number): ParameterContext | ParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParameterContext);
		} else {
			return this.getRuleContext(i, ParameterContext);
		}
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(QuintParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(QuintParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_lambdaUnsugared; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterLambdaUnsugared) {
			listener.enterLambdaUnsugared(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitLambdaUnsugared) {
			listener.exitLambdaUnsugared(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitLambdaUnsugared) {
			return visitor.visitLambdaUnsugared(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LambdaTupleSugarContext extends ParserRuleContext {
	public LPAREN(): TerminalNode[];
	public LPAREN(i: number): TerminalNode;
	public LPAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(QuintParser.LPAREN);
		} else {
			return this.getToken(QuintParser.LPAREN, i);
		}
	}
	public parameter(): ParameterContext[];
	public parameter(i: number): ParameterContext;
	public parameter(i?: number): ParameterContext | ParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParameterContext);
		} else {
			return this.getRuleContext(i, ParameterContext);
		}
	}
	public RPAREN(): TerminalNode[];
	public RPAREN(i: number): TerminalNode;
	public RPAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(QuintParser.RPAREN);
		} else {
			return this.getToken(QuintParser.RPAREN, i);
		}
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_lambdaTupleSugar; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterLambdaTupleSugar) {
			listener.enterLambdaTupleSugar(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitLambdaTupleSugar) {
			listener.exitLambdaTupleSugar(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitLambdaTupleSugar) {
			return visitor.visitLambdaTupleSugar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentOrHoleContext extends ParserRuleContext {
	public qualId(): QualIdContext | undefined {
		return this.tryGetRuleContext(0, QualIdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_identOrHole; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterIdentOrHole) {
			listener.enterIdentOrHole(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitIdentOrHole) {
			listener.exitIdentOrHole(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitIdentOrHole) {
			return visitor.visitIdentOrHole(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterContext extends ParserRuleContext {
	public identOrHole(): IdentOrHoleContext {
		return this.getRuleContext(0, IdentOrHoleContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_parameter; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterParameter) {
			listener.enterParameter(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitParameter) {
			listener.exitParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitParameter) {
			return visitor.visitParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentOrStarContext extends ParserRuleContext {
	public MUL(): TerminalNode | undefined { return this.tryGetToken(QuintParser.MUL, 0); }
	public qualId(): QualIdContext | undefined {
		return this.tryGetRuleContext(0, QualIdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_identOrStar; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterIdentOrStar) {
			listener.enterIdentOrStar(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitIdentOrStar) {
			listener.exitIdentOrStar(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitIdentOrStar) {
			return visitor.visitIdentOrStar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgListContext extends ParserRuleContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_argList; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterArgList) {
			listener.enterArgList(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitArgList) {
			listener.exitArgList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitArgList) {
			return visitor.visitArgList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RecElemContext extends ParserRuleContext {
	public simpleId(): SimpleIdContext | undefined {
		return this.tryGetRuleContext(0, SimpleIdContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_recElem; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterRecElem) {
			listener.enterRecElem(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitRecElem) {
			listener.exitRecElem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitRecElem) {
			return visitor.visitRecElem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NormalCallNameContext extends ParserRuleContext {
	public _op!: Token;
	public qualId(): QualIdContext | undefined {
		return this.tryGetRuleContext(0, QualIdContext);
	}
	public AND(): TerminalNode | undefined { return this.tryGetToken(QuintParser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(QuintParser.OR, 0); }
	public IFF(): TerminalNode | undefined { return this.tryGetToken(QuintParser.IFF, 0); }
	public IMPLIES(): TerminalNode | undefined { return this.tryGetToken(QuintParser.IMPLIES, 0); }
	public SET(): TerminalNode | undefined { return this.tryGetToken(QuintParser.SET, 0); }
	public LIST(): TerminalNode | undefined { return this.tryGetToken(QuintParser.LIST, 0); }
	public MAP(): TerminalNode | undefined { return this.tryGetToken(QuintParser.MAP, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_normalCallName; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterNormalCallName) {
			listener.enterNormalCallName(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitNormalCallName) {
			listener.exitNormalCallName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitNormalCallName) {
			return visitor.visitNormalCallName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NameAfterDotContext extends ParserRuleContext {
	public _op!: Token;
	public qualId(): QualIdContext | undefined {
		return this.tryGetRuleContext(0, QualIdContext);
	}
	public AND(): TerminalNode | undefined { return this.tryGetToken(QuintParser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(QuintParser.OR, 0); }
	public IFF(): TerminalNode | undefined { return this.tryGetToken(QuintParser.IFF, 0); }
	public IMPLIES(): TerminalNode | undefined { return this.tryGetToken(QuintParser.IMPLIES, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_nameAfterDot; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterNameAfterDot) {
			listener.enterNameAfterDot(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitNameAfterDot) {
			listener.exitNameAfterDot(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitNameAfterDot) {
			return visitor.visitNameAfterDot(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperatorContext extends ParserRuleContext {
	public AND(): TerminalNode | undefined { return this.tryGetToken(QuintParser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(QuintParser.OR, 0); }
	public IFF(): TerminalNode | undefined { return this.tryGetToken(QuintParser.IFF, 0); }
	public IMPLIES(): TerminalNode | undefined { return this.tryGetToken(QuintParser.IMPLIES, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(QuintParser.GT, 0); }
	public LT(): TerminalNode | undefined { return this.tryGetToken(QuintParser.LT, 0); }
	public GE(): TerminalNode | undefined { return this.tryGetToken(QuintParser.GE, 0); }
	public LE(): TerminalNode | undefined { return this.tryGetToken(QuintParser.LE, 0); }
	public NE(): TerminalNode | undefined { return this.tryGetToken(QuintParser.NE, 0); }
	public EQ(): TerminalNode | undefined { return this.tryGetToken(QuintParser.EQ, 0); }
	public MUL(): TerminalNode | undefined { return this.tryGetToken(QuintParser.MUL, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(QuintParser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(QuintParser.MOD, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(QuintParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(QuintParser.MINUS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_operator; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterOperator) {
			listener.enterOperator(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitOperator) {
			listener.exitOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitOperator) {
			return visitor.visitOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public STRING(): TerminalNode | undefined { return this.tryGetToken(QuintParser.STRING, 0); }
	public BOOL(): TerminalNode | undefined { return this.tryGetToken(QuintParser.BOOL, 0); }
	public INT(): TerminalNode | undefined { return this.tryGetToken(QuintParser.INT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_literal; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterLiteral) {
			listener.enterLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitLiteral) {
			listener.exitLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualIdContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(QuintParser.IDENTIFIER);
		} else {
			return this.getToken(QuintParser.IDENTIFIER, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_qualId; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterQualId) {
			listener.enterQualId(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitQualId) {
			listener.exitQualId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitQualId) {
			return visitor.visitQualId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpleIdContext extends ParserRuleContext {
	public context: string;
	public _qualId!: QualIdContext;
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(QuintParser.IDENTIFIER, 0); }
	public qualId(): QualIdContext | undefined {
		return this.tryGetRuleContext(0, QualIdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number, context: string) {
		super(parent, invokingState);
		this.context = context;
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_simpleId; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterSimpleId) {
			listener.enterSimpleId(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitSimpleId) {
			listener.exitSimpleId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitSimpleId) {
			return visitor.visitSimpleId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EmptyContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(QuintParser.EOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QuintParser.RULE_empty; }
	// @Override
	public enterRule(listener: QuintListener): void {
		if (listener.enterEmpty) {
			listener.enterEmpty(this);
		}
	}
	// @Override
	public exitRule(listener: QuintListener): void {
		if (listener.exitEmpty) {
			listener.exitEmpty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QuintVisitor<Result>): Result {
		if (visitor.visitEmpty) {
			return visitor.visitEmpty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


