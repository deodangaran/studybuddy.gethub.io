from flask import request
from flask_login import login_required, current_user
from app import app
from app.Components.response import Response

from app.Models.context import Context
from app.Models.choices import Choice
from app.Models.questions import Question
from sqlalchemy.sql import func

@app.route('/history', methods=['POST', 'GET', 'DELETE'])
@login_required
def history():
    if request.method == 'POST':
        data = request.get_json()

        topic = data['topic']
        subject = data['subject']
        context = data['context']
        datas = data['questions']
        score = data['score']

        contextID = data['id']

        if contextID:
            context = Context.query.get(contextID)
            context.score=score
            context.dateCreated=func.now()
            context.update()

            questions = Question.query.filter_by(context=context.id).all()

            for question in questions:
                choices = Choice.query.filter_by(question=question.id).all()
                for choice in choices:
                    choice.delete()
                question.delete()

        else:
            context = Context(
                context=context,
                subject=subject,
                topic=topic,
                user=current_user.id,
                score=score
            )

            context.create()

        for dat in datas:
            quest = Question(
                context=context.id,
                question=dat['question'],
                answer=dat['answer'],
                userAnswer=dat['userAnswer']
            )

            quest.create()

            for choice in dat['choices']:
                c = Choice(
                    question=quest.id,
                    choice=choice
                )

                c.create()
    
        return Response(
            status=201,
            data={'id': context.id}
        )
    
    if request.method == 'GET':
        res = []

        contexts = Context.query.filter_by(user=current_user.id).all()

        for context in contexts:
            data = context.to_dict(exclude='user')
            data['total'] = len(Question.query.filter_by(context=context.id).all())
            res.append(data)

        return Response(
            data=res,
            status=200
        )

    if request.method == 'DELETE':
        contexts = Context.query.filter_by(user=current_user.id).all()
        for context in contexts:
            questions = Question.query.filter_by(context=context.id).all()
            for question in questions:
                choices = Choice.query.filter_by(question=question.id).all()
                for choice in choices:
                    choice.delete()
                question.delete()
            context.delete()
            
        return Response(
            status=200
        )
                
@app.route('/history/test', methods=['GET'])
@login_required
def historyDetail():
    if request.method == 'GET':
        id = request.args.get('id')
        context = Context.query.get(id)

        if context:
            if current_user.id != context.user:
                return Response(
                    status=404
                )

            res = context.to_dict(exclude='user')
            questions = Question.query.filter_by(context=context.id).all()

            data = []
            for question in questions:
                quest = question.to_dict(exclude='context')
                choices = Choice.query.filter_by(question=question.id).all()
                quest['choices'] = [choice.choice for choice in choices]
                data.append(quest)
            
            res['questions'] = data

            return Response(
                data=res,
                status=200
            )
        else:
            return Response(
                status=404
            )

@app.route('/history/validate', methods=['POST'])
@login_required
def validate():
    if request.method == 'POST':
        data = request.get_json()
        questions = [i['question'] for i in data['questions']]

        context = Context.query.filter_by(context=data['context']).first()

        if context:
            quest = Question.query.filter_by(context=context.id).all()

            for question in quest:
                if question.question in questions:
                    return Response(
                        status=403
                    )
            
        return Response(
            status=200
        )

